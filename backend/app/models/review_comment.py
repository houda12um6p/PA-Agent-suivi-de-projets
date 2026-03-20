from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from ..core.database import Base
import uuid


class ReviewComment(Base):
    __tablename__ = "review_comments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    body = Column(String, nullable=False)
    is_problem = Column(Boolean, default=False)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    merge_request_id = Column(UUID(as_uuid=True), ForeignKey("merge_requests.id"), nullable=False)
    created_at = Column(DateTime, nullable=False)

    author = relationship("User", back_populates="review_comments")
    merge_request = relationship("MergeRequest", back_populates="review_comments")

    def detect_problem(self) -> bool:
        """Detect if comment is a problem comment based on keywords"""
        problem_keywords = [
            'bug', 'error', 'issue', 'problem', 'fix', 'broken', 
            'wrong', 'incorrect', 'fail', 'crash', 'exception'
        ]
        
        body_lower = self.body.lower()
        return any(keyword in body_lower for keyword in problem_keywords)
