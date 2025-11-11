import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://34-47-194-149.nip.io/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // only if backend uses cookies (optional)
});

// 🔐 Attach latest token dynamically before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('drone_auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
