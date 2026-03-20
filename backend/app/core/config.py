from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database (SQLite for Python 3.13 compatibility)
    database_url: str = "sqlite:///./app.db"
    
    # Security
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # API
    api_v1_str: str = "/api/v1"
    project_name: str = "FastAPI Backend"
    
    # External APIs (mock URLs for now)
    github_api_url: str = "https://api.github.com"
    jira_api_url: str = "https://your-domain.atlassian.net"
    
    class Config:
        env_file = ".env"


settings = Settings()
