from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from ..core.database import Base
import uuid


class JiraTask(Base):
    __tablename__ = "jira_tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    jira_key = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    status = Column(String, nullable=False)
    story_points = Column(Integer, default=0)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)

    # Relationships
    merge_requests = relationship("MergeRequest", back_populates="jira_task")
