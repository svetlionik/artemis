import axios from 'axios';
import UserPool from '../../UserPool';
import { ResetTokenWithRedirect } from './common';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    const currentUser: any = UserPool.getCurrentUser();
    try {
      if (error.response.status === 404) {
        if (error.response.data?.message === 'User not found') {
          localStorage.removeItem('token');
          window.location.assign('/login');
        }
      } else if (error.response.status === 401) {
        // The following check is to make sure the token is not changed or removed by the user
        if (!currentUser && window.location.pathname !== '/login') {
          ResetTokenWithRedirect();
        }
        currentUser.getSession((error: any, session: any) => {
          if (!error) {
            currentUser.signOut();
            window.location.assign('/login');
          }
        });
      }
    } catch (err) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  },
);
