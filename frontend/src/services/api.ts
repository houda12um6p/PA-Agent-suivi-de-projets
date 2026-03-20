import axios from 'axios';
import { AuthResponse, User, Project, Alert } from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export const login = (email: string, password: string) =>
  api.post<AuthResponse>('/auth/login', { email, password }).then(r => r.data);

export const register = (name: string, email: string, password: string) =>
  api.post<AuthResponse>('/auth/register', { name, email, password }).then(r => r.data);

export const me = () =>
  api.get<User>('/auth/me').then(r => r.data);


export const getProjects = () =>
  api.get<Project[]>('/projects').then(r => r.data);

export const getProject = (id: number) =>
  api.get<Project>(`/projects/${id}`).then(r => r.data);


export const getAlerts = (projectId: number) =>
  api.get<Alert[]>(`/projects/${projectId}/alerts`).then(r => r.data);

export const resolveAlert = (alertId: number) =>
  api.post<Alert>(`/alerts/${alertId}/resolve`).then(r => r.data);

export const getOverview = (projectId: number) =>
  api.get(`/dashboard/${projectId}/overview`).then(r => r.data);

export const getScores = (projectId: number) =>
  api.get(`/dashboard/${projectId}/scores`).then(r => r.data);

export const getTimeline = (projectId: number) =>
  api.get(`/dashboard/${projectId}/timeline`).then(r => r.data);

export default api;
