import api from '../index';
import { ShoppingList, CreateShoppingList, UpdateShoppingList } from './types';

export const getShoppingLists = async () => {
  const response = await api.get<ShoppingList[]>('/shopping-lists');

  return response.data;
};

export const createShoppingList = async (body: CreateShoppingList) => {
  const response = await api.post('/shopping-lists', { ...body });

  return response;
};

export const updateShoppingList = async (variables: {
  id: number;
  body: UpdateShoppingList;
}) => {
  const response = await api.put(
    `/shopping-lists/${variables.id}`,
    variables.body,
  );

  return response;
};

export const deleteShoppingList = async (id: number) => {
  const response = await api.delete(`/shopping-lists/${id}`);

  return response;
};
