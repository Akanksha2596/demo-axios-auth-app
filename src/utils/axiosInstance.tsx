import axios from 'axios';
import { handleAuthentication, logoutUser } from './authService';

export const axiosInstance = axios.create({
  baseURL: "https://strapi.training.brainvire.net"
});

axiosInstance.interceptors.request.use(
  (config :any ) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error :any) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
