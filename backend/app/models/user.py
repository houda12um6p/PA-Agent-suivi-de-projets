from sqlalchemy import Column, String, Float, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from ..core.database import Base
import enum
import uuid

class UserRole(str, enum.Enum):
    DEVELOPER = "developer"
    MANAGER = "manager"
class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.DEVELOPER)
    total_score = Column(Float, default=0.0)
    created_at = Column(DateTime, nullable=False)
    merge_requests = relationship("MergeRequest", back_populates="author")
    commits = relationship("Commit", back_populates="author")
    review_comments = relationship("ReviewComment", back_populates="author")
