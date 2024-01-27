import axios from 'axios';
import { LoginBody, RegisterBody } from './types';

const api = axios.create({
  baseURL: 'https://localhost:7107/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

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
