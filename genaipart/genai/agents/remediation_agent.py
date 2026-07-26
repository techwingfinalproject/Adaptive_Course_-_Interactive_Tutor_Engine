import json
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from genai.config.settings import settings
from genai.config.prompts import REMEDIATION_SYSTEM_PROMPT, REMEDIATION_USER_TEMPLATE

class PracticeQuestionSchema(BaseModel):
    id: int = Field(..., description="Unique question identifier, starting from 1")
    text: str = Field(..., description="The practice question text")
    options: List[str] = Field(..., description="4 choices for the practice question")
    correctAnswerIndex: int = Field(..., description="0-based index of the correct option")
    explanation: str = Field(..., description="Explanation of why this option is correct")

class RemediationSchema(BaseModel):
    simplifiedExplanation: str = Field(..., description="A simplified, clear explanation of the weak concepts using analogies")
    studyNotes: List[str] = Field(..., description="Key bullet points/notes summarizing what the student needs to remember")
    practiceQuestions: List[PracticeQuestionSchema] = Field(..., description="3 target practice questions testing the weak concepts")
    suggestions: List[str] = Field(..., description="Actionable tips/suggestions for student improvement")
    recommendedTopicsToRevise: List[str] = Field(..., description="List of recommended concepts or topics to revise")

class RemediationAgent:
    def __init__(self):
        if not settings.gemini_api_key:
            self.llm = None
        else:
            self.llm = ChatGoogleGenerativeAI(
                model=settings.model_name,
                google_api_key=settings.gemini_api_key,
                temperature=0.7
            )
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", REMEDIATION_SYSTEM_PROMPT),
            ("user", REMEDIATION_USER_TEMPLATE)
        ])

    def generate_remediation(
        self,
        lesson_title: str,
        lesson_notes: str,
        evaluation_results: Dict[str, Any]
    ) -> dict:
        if not self.llm:
            raise ValueError("GEMINI_API_KEY is not configured. Please set the environment variable.")
        
        # Serialize evaluation details for prompt context
        score = evaluation_results.get("score", 0)
        weak_concepts_str = json.dumps(evaluation_results.get("weakConcepts", []), indent=2)
        evaluations_str = json.dumps(evaluation_results.get("evaluations", []), indent=2)
        
        structured_llm = self.llm.with_structured_output(RemediationSchema)
        chain = self.prompt | structured_llm
        
        try:
            result = chain.invoke({
                "lesson_title": lesson_title,
                "lesson_notes": lesson_notes,
                "score": score,
                "weak_concepts": weak_concepts_str,
                "evaluations": evaluations_str
            })
            return result.model_dump()
        except Exception as e:
            # Fallback to manual parsing
            try:
                raw_llm = self.llm
                raw_chain = self.prompt | raw_llm
                response = raw_chain.invoke({
                    "lesson_title": lesson_title,
                    "lesson_notes": lesson_notes,
                    "score": score,
                    "weak_concepts": weak_concepts_str,
                    "evaluations": evaluations_str
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
                raise RuntimeError(f"Failed to generate remediation: {str(e)}. Fallback failed with: {str(inner_e)}")
