import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # API Keys
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")

    # Server Configuration
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", 8000))

    # Model Configuration
    # Using gemini-flash-latest by default for fast responses, low latency and reliable JSON parsing
    model_name: str = os.getenv("GEMINI_MODEL_NAME", "gemini-flash-latest")

    # Workflow Settings
    passing_threshold: float = 70.0

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()

# Basic validation
if not settings.gemini_api_key:
    # We will log a warning, but won't crash on import, allowing the app to start and return 500 when called
    import warnings
    warnings.warn("GEMINI_API_KEY is not set. Please set it in your environment or .env file.")
