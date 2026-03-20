from pydantic import BaseModel
from typing import Optional
import uuid


class MergeRequestBase(BaseModel):
    github_id: Optional[int] = None
    title: str
    status: str
    score: float = 0.0
    story_points: int = 0
class MergeRequestCreate(MergeRequestBase):
    author_id: uuid.UUID
    project_id: uuid.UUID
    jira_task_id: Optional[uuid.UUID] = None


class MergeRequestUpdate(BaseModel):
    github_id: Optional[int] = None
    title: Optional[str] = None
    status: Optional[str] = None
    score: Optional[float] = None
    story_points: Optional[int] = None
    jira_task_id: Optional[uuid.UUID] = None


class MergeRequestResponse(MergeRequestBase):
    id: uuid.UUID
    author_id: uuid.UUID
    project_id: uuid.UUID
    jira_task_id: Optional[uuid.UUID] = None
    created_at: str
    updated_at: str
    class Config:
        from_attributes = True
