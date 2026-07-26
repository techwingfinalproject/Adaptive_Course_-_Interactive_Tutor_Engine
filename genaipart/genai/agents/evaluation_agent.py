import json
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from genai.config.settings import settings
from genai.config.prompts import EVALUATION_SYSTEM_PROMPT, EVALUATION_USER_TEMPLATE

class QuestionEvaluationSchema(BaseModel):
    questionId: int = Field(..., description="The ID of the question evaluated")
    text: str = Field(..., description="The question text")
    studentAnswer: str = Field(..., description="The answer submitted by the student")
    correctAnswer: str = Field(..., description="The correct answer text")
    isCorrect: bool = Field(..., description="True if correct, False otherwise")
    explanation: str = Field(..., description="Constructive explanation of why the answer is correct/incorrect")

class WeakConceptSchema(BaseModel):
    conceptName: str = Field(..., description="Name of the concept/topic where the student showed weakness")
    reason: str = Field(..., description="Why the student had trouble / what was the error pattern")

class EvaluationSchema(BaseModel):
    score: int = Field(..., description="Calculated percentage score from 0 to 100")
    totalQuestions: int = Field(..., description="Total questions graded")
    correctCount: int = Field(..., description="Number of correct answers")
    incorrectCount: int = Field(..., description="Number of incorrect answers")
    evaluations: List[QuestionEvaluationSchema] = Field(..., description="Individual evaluations for each question")
    weakConcepts: List[WeakConceptSchema] = Field(..., description="Identified weak concepts/topics needing review")
    feedback: str = Field(..., description="Constructive personalized feedback message")

class EvaluationAgent:
    def __init__(self):
        if not settings.gemini_api_key:
            self.llm = None
        else:
            self.llm = ChatGoogleGenerativeAI(
                model=settings.model_name,
                google_api_key=settings.gemini_api_key,
                temperature=0.2  # Low temperature for precise grading
            )
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", EVALUATION_SYSTEM_PROMPT),
            ("user", EVALUATION_USER_TEMPLATE)
        ])

    def evaluate_answers(
        self,
        quiz_questions: List[Dict[str, Any]],
        student_answers: List[Dict[str, Any]]
    ) -> dict:
        if not self.llm:
            raise ValueError("GEMINI_API_KEY is not configured. Please set the environment variable.")
        
        quiz_data_str = json.dumps(quiz_questions, indent=2)
        student_answers_str = json.dumps(student_answers, indent=2)
        
        structured_llm = self.llm.with_structured_output(EvaluationSchema)
        chain = self.prompt | structured_llm
        
        try:
            result = chain.invoke({
                "quiz_data": quiz_data_str,
                "student_answers": student_answers_str
            })
            return result.model_dump()
        except Exception as e:
            # Fallback to manual prompt invocation & json parsing
            try:
                raw_llm = self.llm
                raw_chain = self.prompt | raw_llm
                response = raw_chain.invoke({
                    "quiz_data": quiz_data_str,
                    "student_answers": student_answers_str
                })
                text = response.content.strip()
                if text.startswith("```"):
                    parts = text.split("```")
                    if len(parts) >= 3:
                        text = parts[1]
                    if text.startswith("json"):
                        text = text[4:]
                return json.loads(text.strip())
            except Exception as inner_e:
                raise RuntimeError(f"Failed to evaluate quiz: {str(e)}. Fallback failed with: {str(inner_e)}")
