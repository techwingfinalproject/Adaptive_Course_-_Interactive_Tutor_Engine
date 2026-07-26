from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import uvicorn
import sys

# Import agents and graph modules
from genai.config.settings import settings
from genai.agents.tutor_agent import TutorAgent
from genai.agents.quiz_agent import QuizAgent
from genai.agents.evaluation_agent import EvaluationAgent
from genai.agents.remediation_agent import RemediationAgent
from genai.graph.tutor_graph import adaptive_tutor_graph

app = FastAPI(
    title="Adaptive Course & Interactive Tutor Engine - GenAI Module",
    description="GenAI microservice using FastAPI, LangChain, and LangGraph to power adaptive learning features.",
    version="1.0.0"
)

# Configure CORS to allow access from Angular frontend or Java backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------
# Pydantic Schemas for Requests and Responses
# ----------------------------------------------------

class TutorRequest(BaseModel):
    lesson_title: str = Field(..., example="Database Normalization")
    lesson_description: str = Field(..., example="Learn 1NF, 2NF, 3NF and BCNF concepts.")
    lesson_notes: str = Field(..., example="3NF requires no transitive dependencies.")
    student_question: str = Field(..., example="What is a transitive dependency?")
    chat_history: Optional[str] = Field("", description="Formated chat history string.")

class TutorResponse(BaseModel):
    response: str
    suggested_follow_ups: Optional[List[str]] = None

class QuizRequest(BaseModel):
    lesson_title: str = Field(..., example="Database Normalization")
    lesson_description: str = Field(..., example="Learn 1NF, 2NF, 3NF and BCNF concepts.")
    lesson_notes: str = Field(..., example="3NF requires no transitive dependencies.")
    difficulty: Optional[str] = Field("Medium", pattern="^(Easy|Medium|Hard)$")
    total_questions: Optional[int] = Field(5, ge=1, le=15)
    question_format: Optional[str] = Field("MCQ", pattern="^(MCQ|Short Answer)$")

class EvaluateRequest(BaseModel):
    quiz_questions: List[Dict[str, Any]] = Field(..., description="The original generated quiz questions with correct answers.")
    student_answers: List[Dict[str, Any]] = Field(..., description="The answers provided by the student, format: [{'questionId': 1, 'answer': 'text'}]")

class RemediationRequest(BaseModel):
    lesson_title: str = Field(..., example="Database Normalization")
    lesson_notes: str = Field(..., example="3NF requires no transitive dependencies.")
    evaluation_results: Dict[str, Any] = Field(..., description="The output evaluation JSON from /evaluate.")

class AdaptiveLearningRequest(BaseModel):
    lesson_title: str = Field(..., example="Database Normalization")
    lesson_description: str = Field(..., example="Learn 1NF, 2NF, 3NF and BCNF concepts.")
    lesson_notes: str = Field(..., example="3NF requires no transitive dependencies.")
    difficulty: Optional[str] = Field("Medium")
    total_questions: Optional[int] = Field(5)
    question_format: Optional[str] = Field("MCQ")
    student_answers: Optional[List[Dict[str, Any]]] = None
    message: Optional[str] = None
    quiz: Optional[Dict[str, Any]] = None
    evaluation: Optional[Dict[str, Any]] = None
    passed: Optional[bool] = False
    retry_count: Optional[int] = 0
    remediation: Optional[Dict[str, Any]] = None

# Initialize Agents
tutor_agent = TutorAgent()
quiz_agent = QuizAgent()
evaluation_agent = EvaluationAgent()
remediation_agent = RemediationAgent()

# ----------------------------------------------------
# REST API Endpoints
# ----------------------------------------------------

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Adaptive Tutor GenAI Module",
        "model": settings.model_name
    }

@app.post("/tutor", response_model=TutorResponse, status_code=status.HTTP_200_OK)
def tutor_endpoint(req: TutorRequest):
    """
    Ask the tutor agent a question based on current lesson details.
    """
    try:
        explanation = tutor_agent.answer_question(
            lesson_title=req.lesson_title,
            lesson_description=req.lesson_description,
            lesson_notes=req.lesson_notes,
            student_question=req.student_question,
            chat_history=req.chat_history
        )
        return TutorResponse(response=explanation)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Tutor agent failure: {str(e)}")

@app.post("/quiz", status_code=status.HTTP_200_OK)
def quiz_endpoint(req: QuizRequest):
    """
    Dynamically generate a quiz based on the lesson contents.
    """
    try:
        quiz_data = quiz_agent.generate_quiz(
            lesson_title=req.lesson_title,
            lesson_description=req.lesson_description,
            lesson_notes=req.lesson_notes,
            difficulty=req.difficulty,
            total_questions=req.total_questions,
            question_format=req.question_format
        )
        return quiz_data
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Quiz agent failure: {str(e)}")

@app.post("/evaluate", status_code=status.HTTP_200_OK)
def evaluate_endpoint(req: EvaluateRequest):
    """
    Grade student answers and return score, correct answers mapping, and weak concepts.
    """
    try:
        evaluation_results = evaluation_agent.evaluate_answers(
            quiz_questions=req.quiz_questions,
            student_answers=req.student_answers
        )
        return evaluation_results
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Evaluation agent failure: {str(e)}")

@app.post("/remediation", status_code=status.HTTP_200_OK)
def remediation_endpoint(req: RemediationRequest):
    """
    Generate study materials, notes, and retry practice questions if student failed.
    """
    try:
        remediation_data = remediation_agent.generate_remediation(
            lesson_title=req.lesson_title,
            lesson_notes=req.lesson_notes,
            evaluation_results=req.evaluation_results
        )
        return remediation_data
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Remediation agent failure: {str(e)}")

@app.post("/adaptive-learning", status_code=status.HTTP_200_OK)
def adaptive_learning_endpoint(req: AdaptiveLearningRequest):
    """
    Drive the stateful LangGraph workflow.
    Executes nodes in sequence and handles conditional branches automatically.
    """
    # Initialize the workflow state from request
    initial_state = {
        "lesson_title": req.lesson_title,
        "lesson_description": req.lesson_description,
        "lesson_notes": req.lesson_notes,
        "difficulty": req.difficulty,
        "total_questions": req.total_questions,
        "question_format": req.question_format,
        "quiz": req.quiz,
        "student_answers": req.student_answers,
        "evaluation": req.evaluation,
        "passed": req.passed,
        "retry_count": req.retry_count,
        "remediation": req.remediation,
        "current_step": "init",
        "message": req.message
    }
    
    try:
        # Run the compiled LangGraph workflow
        final_state = adaptive_tutor_graph.invoke(initial_state)
        return final_state
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Workflow failure: {str(e)}")

if __name__ == "__main__":
    # Start the server on configured host and port
    uvicorn.run(app, host=settings.host, port=settings.port)
