import api from '..';
import { CreateFamily } from './types';

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

  return response.data;
};

export const removeFamilyMember = async (id: number) => {
  const response = await api.delete(`/family/user/${id}`);

  return response;
};
