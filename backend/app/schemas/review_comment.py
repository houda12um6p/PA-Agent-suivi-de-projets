from pydantic import BaseModel
from typing import Optional
import uuid


class ReviewCommentBase(BaseModel):
    body: str
    is_problem: bool = False


class ReviewCommentCreate(ReviewCommentBase):
    author_id: uuid.UUID
    merge_request_id: uuid.UUID


class ReviewCommentUpdate(BaseModel):
    body: Optional[str] = None
    is_problem: Optional[bool] = None


class ReviewCommentResponse(ReviewCommentBase):
    id: uuid.UUID
    author_id: uuid.UUID
    merge_request_id: uuid.UUID
    created_at: str

    class Config:
        from_attributes = True
