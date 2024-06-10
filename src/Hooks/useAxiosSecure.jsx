import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logout} = useAuth()
  const axiosInstance = axios.create({
    baseURL: 'https://assignment-12-server-eta-rosy.vercel.app',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
        const status = error.response.status
        if(status === 401 || status === 403) {
            logout()
            .then(() => {
                console.log('error from axios token')
            })
            navigate('/login')
        }
        Promise.reject(error)
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
