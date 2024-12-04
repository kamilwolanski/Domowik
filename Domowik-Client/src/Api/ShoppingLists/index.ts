import api from '../index';
import { UpdateShoppingList } from '../types';
import { ShoppingList, CreateShoppingList } from './types';

export const getShoppingLists = async () => {
  const response = await api.get<ShoppingList[]>('/family/shopping-lists');

  return response.data;
};

export const createShoppingList = async (body: CreateShoppingList) => {
  const response = await api.post('/family/shopping-lists', { ...body });

  return response;
};

export const updateShoppingList = async (body: UpdateShoppingList[]) => {
  const response = await api.put('/family/shopping-list', [...body]);

  return response;
};

export const deleteShoppingList = async (id: number) => {
  const response = await api.delete(`/family/shopping-lists/${id}`);

  return response;
};
