from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from ..models.merge_request import MergeRequest
from ..models.commit import Commit
from ..models.review_comment import ReviewComment
from ..models.jira_task import JiraTask
from ..services.jira_service import JiraService
import uuid
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class WebhookService:
    def __init__(self, db: Session):
        self.db = db
        self.jira_service = JiraService(db)

    async def handle_github_push(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Handle GitHub push webhook event"""
        try:
            repo_name = payload.get("repository", {}).get("name")
            commits = payload.get("commits", [])
            
            processed_commits = []
            for commit_data in commits:
                # Extract commit information
                sha = commit_data.get("id")
                message = commit_data.get("message")
                author_email = commit_data.get("author", {}).get("email")
                timestamp = commit_data.get("timestamp")
                
                # In a real implementation, you would:
                # 1. Find the user by email
                # 2. Create/update commit record
                # 3. Associate with appropriate merge request
                
                processed_commits.append({
                    "sha": sha,
                    "message": message,
                    "processed": True
                })
            
            return {
                "status": "success",
                "repo": repo_name,
                "commits_processed": len(processed_commits)
            }
        except Exception as e:
            logger.error(f"Error handling GitHub push webhook: {str(e)}")
            return {"status": "error", "message": str(e)}

    async def handle_github_pull_request(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Handle GitHub pull request webhook event"""
        try:
            action = payload.get("action")
            pr_data = payload.get("pull_request", {})
            
            if action in ["opened", "synchronize", "reopened", "closed"]:
                # Extract PR information
                github_id = pr_data.get("id")
                title = pr_data.get("title")
                author_email = pr_data.get("user", {}).get("email")
                status = "open" if action in ["opened", "synchronize", "reopened"] else "closed"
                
                # Extract Jira key from title
                jira_key = None
                import re
                pattern = r'([A-Z]+-\d+)'
                match = re.search(pattern, title)
                if match:
                    jira_key = match.group(1)
                
                # In a real implementation, you would:
                # 1. Find the user by email
                # 2. Create/update merge request record
                # 3. Link to Jira task if jira_key found
                
                return {
                    "status": "success",
                    "action": action,
                    "pr_id": github_id,
                    "title": title,
                    "jira_key_extracted": jira_key
                }
            
            return {"status": "ignored", "action": action}
        except Exception as e:
            logger.error(f"Error handling GitHub PR webhook: {str(e)}")
            return {"status": "error", "message": str(e)}

    async def handle_github_review_comment(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Handle GitHub review comment webhook event"""
        try:
            action = payload.get("action")
            comment_data = payload.get("comment", {})
            pr_data = payload.get("pull_request", {})
            
            if action in ["created", "edited", "deleted"]:
                # Extract comment information
                body = comment_data.get("body", "")
                author_email = comment_data.get("user", {}).get("email")
                pr_id = pr_data.get("id")
                
                # Detect if comment is a problem comment
                problem_keywords = [
                    'bug', 'error', 'issue', 'problem', 'fix', 'broken', 
                    'wrong', 'incorrect', 'fail', 'crash', 'exception'
                ]
                is_problem = any(keyword in body.lower() for keyword in problem_keywords)
                
                # In a real implementation, you would:
                # 1. Find the user by email
                # 2. Find the merge request by GitHub ID
                # 3. Create/update review comment record
                
                return {
                    "status": "success",
                    "action": action,
                    "pr_id": pr_id,
                    "is_problem_detected": is_problem,
                    "comment_length": len(body)
                }
            
            return {"status": "ignored", "action": action}
        except Exception as e:
            logger.error(f"Error handling GitHub review comment webhook: {str(e)}")
            return {"status": "error", "message": str(e)}

    async def handle_jira_issue_updated(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Handle Jira issue updated webhook event"""
        try:
            issue_data = payload.get("issue", {})
            changelog = payload.get("changelog", {})
            
            # Extract issue information
            jira_key = issue_data.get("key")
            title = issue_data.get("fields", {}).get("summary")
            status = issue_data.get("fields", {}).get("status", {}).get("name")
            
            # Find existing Jira task
            jira_task = self.jira_service.find_jira_task_by_key(jira_key)
            
            if jira_task:
                # Update task
                jira_task.title = title
                jira_task.status = status
                jira_task.updated_at = datetime.utcnow()
                self.db.commit()
                
                return {
                    "status": "success",
                    "action": "updated",
                    "jira_key": jira_key,
                    "new_status": status
                }
            else:
                # Create new task
                new_task = JiraTask(
                    jira_key=jira_key,
                    title=title,
                    status=status,
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow()
                )
                self.db.add(new_task)
                self.db.commit()
                
                return {
                    "status": "success",
                    "action": "created",
                    "jira_key": jira_key,
                    "task_id": str(new_task.id)
                }
        except Exception as e:
            logger.error(f"Error handling Jira issue webhook: {str(e)}")
            return {"status": "error", "message": str(e)}
