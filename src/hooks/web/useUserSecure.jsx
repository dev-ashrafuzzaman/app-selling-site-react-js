import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../useAuth';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

const useUserSecure = () => {
    const navigate = useNavigate();
    const { WebUserLogout } = useAuth();

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
  };

    useEffect(() => {
        axiosSecure.interceptors.request.use(config => {
            const token = getCookie('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, error => {
            return Promise.reject(error);
        });

        axiosSecure.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                WebUserLogout();
                navigate('/user/auth/login');
            }
            return Promise.reject(error);
        });
    }, [navigate, WebUserLogout]);

    return [axiosSecure];
};



export default useUserSecure;