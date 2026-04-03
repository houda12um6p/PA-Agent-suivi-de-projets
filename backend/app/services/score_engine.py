"""
Scoring engine for merge requests and developers.

Formula (validated by supervisors):
    Score = max(0, B - b^max(0, Cp - SP) - Lr)

Where:
    B  = 1000     base score
    b  = 1.4      exponential penalty base
    Cp = number of review comments flagged as problems (is_problem = True)
    SP = story points from the linked Jira task (0 if no task linked)
    Lr = refactored lines in this MR (0 if not set)

The exponential penalty b^(Cp-SP) only kicks in when Cp exceeds SP.
As long as the number of problems stays within the story-point budget, the
penalty stays at b^0 = 1 (minimal). Beyond that it grows fast.
"""

import uuid

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..models.merge_request import MergeRequest
from ..models.review_comment import ReviewComment
from ..models.user import User

# --- Formula constants ---
B: float = 1000.0   # base score every MR starts with
b: float = 1.4      # base of the exponential penalty


def calculate_mr_score(mr_id: uuid.UUID, db: Session) -> float:
    """
    Calculate and save the score for one MergeRequest.

    Steps:
      1. Load the MR (404 if missing)
      2. Count problem comments (is_problem = True)
      3. Get story points from the linked Jira task (0 if none)
      4. Get refactored lines from the MR (0 if not set)
      5. Apply the formula, clamp to 0
      6. Persist the new score and return it
    """
    mr = db.query(MergeRequest).filter(MergeRequest.id == mr_id).first()
    if not mr:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"MergeRequest {mr_id} not found",
        )

    # Cp — problem comments on this MR
    Cp = (
        db.query(ReviewComment)
        .filter(
            ReviewComment.merge_request_id == mr_id,
            ReviewComment.is_problem == True,  # noqa: E712
        )
        .count()
    )

    # SP — story points budget from the linked Jira task
    SP = mr.jira_task.story_points if mr.jira_task else 0

    # Lr — refactored lines (linear penalty)
    Lr = mr.refactored_lines or 0

    # Apply formula: exponential penalty only kicks in when Cp exceeds SP
    exponent = max(0, Cp - SP)
    penalty = b ** exponent
    score = max(0.0, B - penalty - Lr)

    # Persist the result
    mr.score = score
    db.commit()

    return score


def calculate_developer_score(user_id: uuid.UUID, db: Session) -> float:
    """
    Sum all MR scores for a developer and save to User.total_score.

    Note: this reads the already-saved MR scores, it does NOT recalculate
    individual MRs. Call calculate_mr_score first if you want fresh values.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user_id} not found",
        )

    # Sum scores across all MRs authored by this developer
    mrs = (
        db.query(MergeRequest)
        .filter(MergeRequest.author_id == user_id)
        .all()
    )
    total = sum(mr.score or 0.0 for mr in mrs)

    # Persist the total
    user.total_score = total
    db.commit()

    return total


def calculate_project_score(project_id: uuid.UUID, db: Session) -> float:
    """
    Recalculate every MR score in a project, then every developer total.
    Returns the sum of all MR scores (project-level total).
    """
    mrs = (
        db.query(MergeRequest)
        .filter(MergeRequest.project_id == project_id)
        .all()
    )

    # Recalculate each MR and collect fresh scores
    mr_scores = [calculate_mr_score(mr.id, db) for mr in mrs]

    # Recalculate each unique developer who has an MR in this project
    author_ids = {mr.author_id for mr in mrs if mr.author_id}
    for user_id in author_ids:
        calculate_developer_score(user_id, db)

    return sum(mr_scores)
