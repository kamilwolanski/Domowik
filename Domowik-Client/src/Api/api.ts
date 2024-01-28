import axios from 'axios';
import { CreateFamily, LoginBody, RegisterBody } from './types';

const api = axios.create({
  baseURL: 'https://localhost:7107/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const login = async (body: LoginBody) => {
  const response = await api.post('/account/login', {
    ...body,
  });

  return response;
};

export const register = async (body: RegisterBody) => {
  const response = await api.post('/account/register', {
    ...body,
  });

  return response;
};

export const getFamilies = async () => {
  const response = await api.get('/family');

  return response;
};

export const createFamily = async (body: CreateFamily) => {
  const response = await api.post('/family', {
    ...body,
  });

  return response;
};

export const getUserFamily = async () => {
  const response = await api.get('/user/family');

  return response;
};
