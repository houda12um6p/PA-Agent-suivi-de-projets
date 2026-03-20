from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..core.database import Base
import enum


class CommitType(str, enum.Enum):
    FEATURE = "feature"
    BUGFIX = "bugfix"
    REFACTOR = "refactor"
    OTHER = "other"


class Commit(Base):
    __tablename__ = "commits"

    sha = Column(String, primary_key=True)
    message = Column(String, nullable=False)
    author_id = Column(String, ForeignKey("users.id"), nullable=False)
    merge_request_id = Column(String, ForeignKey("merge_requests.id"), nullable=False)
    date = Column(DateTime, nullable=False)

    # Relationships
    author = relationship("User", back_populates="commits")
    merge_request = relationship("MergeRequest", back_populates="commits")

    def analyze_message(self) -> CommitType:
        """Analyze commit message to determine type"""
        message_lower = self.message.lower()
        
        if message_lower.startswith('feat'):
            return CommitType.FEATURE
        elif message_lower.startswith('fix'):
            return CommitType.BUGFIX
        elif message_lower.startswith('refactor'):
            return CommitType.REFACTOR
        else:
            return CommitType.OTHER
