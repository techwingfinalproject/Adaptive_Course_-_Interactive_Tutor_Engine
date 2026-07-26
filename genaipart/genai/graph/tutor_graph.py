from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END
from genai.agents.tutor_agent import TutorAgent
from genai.agents.quiz_agent import QuizAgent
from genai.agents.evaluation_agent import EvaluationAgent
from genai.agents.remediation_agent import RemediationAgent
from genai.config.settings import settings

# Define the state shape
class TutorState(TypedDict):
    lesson_title: str
    lesson_description: str
    lesson_notes: str
    difficulty: str
    total_questions: int
    question_format: str
    quiz: Optional[Dict[str, Any]]
    student_answers: Optional[List[Dict[str, Any]]]
    evaluation: Optional[Dict[str, Any]]
    passed: bool
    retry_count: int
    remediation: Optional[Dict[str, Any]]
    current_step: str
    message: Optional[str]

# Agent Nodes
def tutor_node(state: TutorState) -> Dict[str, Any]:
    """Node for answering student questions or providing lesson summary."""
    if state.get("message") and "question:" in state["message"].lower():
        q = state["message"].split("question:")[1].strip()
        tutor = TutorAgent()
        ans = tutor.answer_question(
            state["lesson_title"],
            state["lesson_description"],
            state["lesson_notes"],
            q
        )
        return {"current_step": "tutor_q_and_a", "message": ans}
    return {"current_step": "tutor_intro", "message": f"Welcome to {state['lesson_title']}! Let's start with a quiz."}

def generate_quiz_node(state: TutorState) -> Dict[str, Any]:
    """Node for generating a dynamic quiz from lesson details."""
    quiz_agent = QuizAgent()
    quiz = quiz_agent.generate_quiz(
        lesson_title=state["lesson_title"],
        lesson_description=state["lesson_description"],
        lesson_notes=state["lesson_notes"],
        difficulty=state.get("difficulty", "Medium"),
        total_questions=state.get("total_questions", 5),
        question_format=state.get("question_format", "MCQ")
    )
    return {"quiz": quiz, "current_step": "quiz_generated", "message": "Quiz generated successfully."}

def evaluate_node(state: TutorState) -> Dict[str, Any]:
    """Node for grading student answers and analyzing weak concepts."""
    eval_agent = EvaluationAgent()
    quiz = state.get("quiz")
    student_answers = state.get("student_answers") or []
    
    if not quiz or not quiz.get("questions"):
        # If quiz is missing from state, we can't grade
        return {
            "evaluation": {"score": 0, "feedback": "No quiz details available for grading."},
            "passed": False,
            "current_step": "evaluation_failed"
        }

    eval_res = eval_agent.evaluate_answers(
        quiz_questions=quiz.get("questions", []),
        student_answers=student_answers
    )
    
    score = eval_res.get("score", 0)
    passed = score >= settings.passing_threshold
    
    return {
        "evaluation": eval_res,
        "passed": passed,
        "current_step": "evaluation_completed",
        "message": f"Evaluation complete. Score: {score}%. Passing threshold: {settings.passing_threshold}%."
    }

def remediation_node(state: TutorState) -> Dict[str, Any]:
    """Node for generating custom study notes and practice questions if failed."""
    remed_agent = RemediationAgent()
    remed = remed_agent.generate_remediation(
        lesson_title=state["lesson_title"],
        lesson_notes=state["lesson_notes"],
        evaluation_results=state.get("evaluation", {})
    )
    new_retry_count = state.get("retry_count", 0) + 1
    return {
        "remediation": remed,
        "retry_count": new_retry_count,
        "current_step": "remediation_generated",
        "message": "Generated custom remediation material for you. Please review study notes and try practice questions."
    }

# Conditional routing functions
def route_after_quiz(state: TutorState) -> str:
    """Decide whether to grade or finish based on presence of student answers."""
    if state.get("student_answers") is not None and len(state.get("student_answers")) > 0:
        return "evaluate"
    return "finish"

def route_after_evaluation(state: TutorState) -> str:
    """Route to remediation or finish depending on passing state."""
    if state.get("passed", False):
        return "finish"
    return "remedy"

# Compile Workflow Graph
def build_tutor_graph():
    workflow = StateGraph(TutorState)
    
    # Add nodes to the graph
    workflow.add_node("tutor", tutor_node)
    workflow.add_node("generate_quiz", generate_quiz_node)
    workflow.add_node("evaluate", evaluate_node)
    workflow.add_node("remedy", remediation_node)
    
    # Set the entry point
    workflow.set_entry_point("tutor")
    
    # Define simple edges
    workflow.add_edge("tutor", "generate_quiz")
    
    # Add conditional routing after quiz generation
    workflow.add_conditional_edges(
        "generate_quiz",
        route_after_quiz,
        {
            "evaluate": "evaluate",
            "finish": END
        }
    )
    
    # Add conditional routing after evaluation
    workflow.add_conditional_edges(
        "evaluate",
        route_after_evaluation,
        {
            "finish": END,
            "remedy": "remedy"
        }
    )
    
    # After remediation, finish current execution and return remediation material to user
    workflow.add_edge("remedy", END)
    
    return workflow.compile()

# Instantiated graph runner
adaptive_tutor_graph = build_tutor_graph()
