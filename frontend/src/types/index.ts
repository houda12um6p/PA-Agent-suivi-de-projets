
export interface User {
  id: number;
  name: string;
  email: string;
  total_score: number;
}
export interface Project {
  id: number;
  name: string;
  repo_url: string;
  status: string;
  score: number;
}
export interface MergeRequest {
  id: number;
  title : string;
  status: string;
  final_score: number;
  created_at : string;
}

export interface ReviewComment {
  id: number;
  author: string;
  body: string;
  is_problem: boolean;
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  commit_type: string;
}

export interface  JiraTask {
  id: number;
  title: string;
  status: string;
  story_points: number;
}

export interface Alert {
  id: number;
  type: string;
  severity: string;
  message: string;
  is_resolved: boolean;
}
export interface Meeting {
  id: number;
  title: string;
  date: string;
  content: string;
}

export interface DeveloperScoreHistory {
  id: number;
  score: number;
  delta: number;
  recorded_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
