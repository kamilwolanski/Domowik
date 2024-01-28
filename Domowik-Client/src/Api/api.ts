import axios from 'axios';
import {
  AddUser,
  CreateFamily,
  EditUser,
  LoginBody,
  RegisterBody,
  UpdateShoppingList,
} from './types';

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

export const deleteFamily = async () => {
  const response = await api.delete('/family');

  return response;
};

export const getUserFamily = async () => {
  const response = await api.get('/user/family');

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

export const addUser = async (body: AddUser) => {
  const response = await api.post('/family/add', {
    ...body,
  });

  return response;
};

export const removeFamilyMember = async (id: number) => {
  const response = await api.delete(`/family/user/${id}`);

  return response;
};

export const updateShoppingList = async (body: UpdateShoppingList[]) => {
  const response = await api.put('/family/shopping-list', [...body]);

  return response;
};

export const getShoppingList = async () => {
  const response = await api.get('/family/shopping-list');

  return response;
};
