import json
from typing import List, Optional
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from genai.config.settings import settings
from genai.config.prompts import QUIZ_SYSTEM_PROMPT, QUIZ_USER_TEMPLATE

class QuizQuestionSchema(BaseModel):
    id: int = Field(..., description="Unique question identifier, starting from 1")
    text: str = Field(..., description="The question text testing the lesson concepts")
    type: str = Field(..., description="Question format: MCQ or Short Answer")
    options: List[str] = Field(default=[], description="4 unique choices for MCQ, or empty list if Short Answer")
    correctAnswer: str = Field(..., description="The correct option text for MCQ, or correct response/keyword for Short Answer")

class QuizSchema(BaseModel):
    title: str = Field(..., description="A descriptive title for the quiz based on the lesson")
    questions: List[QuizQuestionSchema] = Field(..., description="List of generated questions")

class QuizAgent:
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
            ("system", QUIZ_SYSTEM_PROMPT),
            ("user", QUIZ_USER_TEMPLATE)
        ])

    def generate_quiz(
        self,
        lesson_title: str,
        lesson_description: str,
        lesson_notes: str,
        difficulty: str = "Medium",
        total_questions: int = 5,
        question_format: str = "MCQ"
    ) -> dict:
        if not self.llm:
            raise ValueError("GEMINI_API_KEY is not configured. Please set the environment variable.")
        
        # Use structured output parsing
        structured_llm = self.llm.with_structured_output(QuizSchema)
        chain = self.prompt | structured_llm
        
        try:
            result = chain.invoke({
                "lesson_title": lesson_title,
                "lesson_description": lesson_description,
                "lesson_notes": lesson_notes,
                "difficulty": difficulty,
                "total_questions": total_questions,
                "question_format": question_format
            })
            return result.model_dump()
        except Exception as e:
            # Fallback to manual prompt invocation & json parsing
            try:
                raw_llm = self.llm
                raw_chain = self.prompt | raw_llm
                response = raw_chain.invoke({
                    "lesson_title": lesson_title,
                    "lesson_description": lesson_description,
                    "lesson_notes": lesson_notes,
                    "difficulty": difficulty,
                    "total_questions": total_questions,
                    "question_format": question_format
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
                raise RuntimeError(f"Failed to generate quiz: {str(e)}. Fallback failed with: {str(inner_e)}")
