



// config/api.js
import axios from 'axios';
import { getToken, removeToken } from '../utils/cookies';
export const baseURL = 'http://54.162.89.235:4750';  



const Axios = axios.create({
   baseURL: `${baseURL}/api`,
  timeout: 10000,
  withCredentials: true, // CRITICAL: This allows cookies to be sent/received
});

// Request interceptor
Axios.interceptors.request.use(
  (config) => {
    // For cookie-based auth, token is automatically included by browser
    // But we can still check if it exists
    const token = getToken();
    
    // You might want to add custom headers if needed
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
Axios.interceptors.response.use(
  (response) => {
    // Check if response has Set-Cookie header (token is set here)
    if (response.headers['set-cookie']) {
      // Token is automatically stored by browser
      console.log('Cookie set by backend');
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeToken();
      // Optional: Redirect to login
      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;