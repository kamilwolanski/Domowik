import axios from 'axios';
import {
  AddTransaction,
  EditUser,
  LoginBody,
  RegisterBody,
  TransactionCategory,
  TransactionCategoryType,
} from './types';

const api = axios.create({
  baseURL: 'http://localhost:7107/api',
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

export const getUser = async () => {
  const response = await api.get('/user');

  return response;
};

export const editUser = async (body: EditUser) => {
  const response = await api.put('/user', {
    ...body,
  });

  return response;
};

export const getFinances = async () => {
  const response = await api.get('/family/finances');

  return response;
};

export const addTransaction = async (body: AddTransaction) => {
  const response = await api.post('/family/transaction', {
    ...body,
  });

  return response;
};

export const getTransactionCategories = async (
  transactionCategory?: TransactionCategoryType,
) => {
  const response = await api.get<TransactionCategory[]>(
    `/transaction-categories${transactionCategory !== undefined ? `?type=${transactionCategory}` : ''}`,
  );

  return response;
};

export const removeTransaction = async (transactionId: number) => {
  const response = await api.delete(`/family/transaction/${transactionId}`);

  return response;
};

export default api;
