import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(() => {

    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });


    axiosSecure.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {

        logoutUser().then(() => {

          navigate('/leery/admin/auth/validation');
        });
      }
      return Promise.reject(error);
    });
  }, [navigate, logoutUser]);

  return [axiosSecure];
};

export default useAxiosSecure;