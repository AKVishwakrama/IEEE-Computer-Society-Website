import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ieee_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

// Events
export const eventsAPI = {
  getAll: (params?: Record<string, string | number>) => api.get('/events', { params }),
  getOne: (id: string) => api.get(`/events/${id}`),
  create: (data: unknown) => api.post('/events', data),
  update: (id: string, data: unknown) => api.put(`/events/${id}`, data),
  delete: (id: string) => api.delete(`/events/${id}`),
  register: (id: string, data: unknown) => api.post(`/events/${id}/register`, data),
  getRegistrations: (id: string) => api.get(`/events/${id}/registrations`),
};

// Office Bearers
export const officeBearersAPI = {
  getAll: (params?: Record<string, string>) => api.get('/office-bearers', { params }),
  create: (data: unknown) => api.post('/office-bearers', data),
  update: (id: string, data: unknown) => api.put(`/office-bearers/${id}`, data),
  delete: (id: string) => api.delete(`/office-bearers/${id}`),
};

// Gallery
export const galleryAPI = {
  getAll: (params?: Record<string, string | number>) => api.get('/gallery', { params }),
  create: (data: unknown) => api.post('/gallery', data),
  delete: (id: string) => api.delete(`/gallery/${id}`),
};

// Membership
export const membershipAPI = {
  apply: (data: unknown) => api.post('/membership/apply', data),
  getAll: () => api.get('/membership'),
  updateStatus: (id: string, status: string) => api.put(`/membership/${id}/status`, { status }),
};

// Contact
export const contactAPI = {
  send: (data: unknown) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
};

export default api;
