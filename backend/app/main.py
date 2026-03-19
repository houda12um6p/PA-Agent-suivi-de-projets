from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .routers import auth, github, jira, webhooks
from .core.database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.project_name,
    openapi_url=f"{settings.api_v1_str}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=settings.api_v1_str)
app.include_router(github.router, prefix=settings.api_v1_str)
app.include_router(jira.router, prefix=settings.api_v1_str)
app.include_router(webhooks.router, prefix=settings.api_v1_str)


@app.get("/")
def root():
    return {"message": "FastAPI Backend is running", "docs": "/docs"}


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": settings.project_name}
