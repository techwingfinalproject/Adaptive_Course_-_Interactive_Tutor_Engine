from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from genai.config.settings import settings
from genai.config.prompts import TUTOR_SYSTEM_PROMPT, TUTOR_USER_TEMPLATE

class TutorAgent:
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
            ("system", TUTOR_SYSTEM_PROMPT),
            ("user", TUTOR_USER_TEMPLATE)
        ])

    def answer_question(
        self,
        lesson_title: str,
        lesson_description: str,
        lesson_notes: str,
        student_question: str,
        chat_history: str = ""
    ) -> str:
        if not self.llm:
            raise ValueError("GEMINI_API_KEY is not configured. Please set the environment variable.")
        
        chain = self.prompt | self.llm
        try:
            response = chain.invoke({
                "lesson_title": lesson_title,
                "lesson_description": lesson_description,
                "lesson_notes": lesson_notes,
                "student_question": student_question,
                "chat_history": chat_history
            })
            content = response.content
            if isinstance(content, list):
                return "".join([c.get("text", "") if isinstance(c, dict) else str(c) for c in content])
            return str(content)
        except Exception as e:
            raise RuntimeError(f"Failed to fetch explanation from Gemini API: {str(e)}")
