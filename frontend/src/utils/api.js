import axios from 'axios';

// Configured Axios instance ready for future backend integration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.shopease.example.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('shopease_user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (e) {
        console.error('Failed to parse user session for token', e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Session expired or unauthorized');
    }
    return Promise.reject(error);
  }
);

export default api;
