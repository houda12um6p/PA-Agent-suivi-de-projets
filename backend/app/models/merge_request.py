from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from ..core.database import Base
import uuid
import re
class MergeRequest(Base):
    __tablename__ = "merge_requests"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    github_id = Column(Integer, nullable=True)
    title = Column(String, nullable=False)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    jira_task_id = Column(UUID(as_uuid=True), ForeignKey("jira_tasks.id"), nullable=True)
    status = Column(String, nullable=False)
    score = Column(Float, default=0.0)
    story_points = Column(Integer, default=0)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    author = relationship("User", back_populates="merge_requests")
    project = relationship("Project", back_populates="merge_requests")
    jira_task = relationship("JiraTask", back_populates="merge_requests")
    commits = relationship("Commit", back_populates="merge_request")
    review_comments = relationship("ReviewComment", back_populates="merge_request")
    def extract_jira_key(self) -> str:
        pattern = r'([A-Z]+-\d+)'
        match = re.search(pattern, self.title)
        return match.group(1) if match else None
