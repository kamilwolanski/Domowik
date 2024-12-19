import api from '../index';
import {
  ShoppingList,
  CreateShoppingList,
  UpdateShoppingList,
  AvailableProduct,
  AddProductToShoppingList,
  UpdateShoppingListProduct,
} from './types';

export const getShoppingLists = async () => {
  const response = await api.get<ShoppingList[]>('/shopping-lists');

  return response.data;
};

export const getShoppingList = async (id: number) => {
  const response = await api.get<ShoppingList>(`/shopping-lists/${id}`);

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

export const toggleProductPurchased = async (variables: {
  listId: number;
  productId: number;
}) => {
  const response = await api.patch(
    `/shopping-lists/${variables.listId}/products/${variables.productId}/toggle-purchased`,
  );

  return response;
};

export const getAvailableProducts = async (
  id: number,
  search?: string,
  limit?: number,
) => {
  const params = new URLSearchParams();

  if (search) {
    params.append('name', search);
  }

  if (limit) {
    params.append('limit', limit.toString());
  }

  const response = await api.get<AvailableProduct[]>(
    `/shopping-lists/${id}/available-products/?${params.toString()}`,
  );

  return response.data;
};

export const addProductToShoppingList = async (variables: {
  listId: number;
  body: AddProductToShoppingList;
}) => {
  const response = await api.post(
    `/shopping-lists/${variables.listId}/products`,
    variables.body,
  );

  return response.data;
};

export const updateProductInShoppingList = async (variables: {
  listId: number;
  shoppingListProductId: number;
  body: UpdateShoppingListProduct;
}) => {
  const response = await api.patch(
    `/shopping-lists/${variables.listId}/products/${variables.shoppingListProductId}`,
    variables.body,
  );

  return response.data;
};

export const removeProductFromShoppingList = async (variables: {
  listId: number;
  shoppingListProductId: number;
}) => {
  const response = await api.delete(
    `/shopping-lists/${variables.listId}/products/${variables.shoppingListProductId}`,
  );

  return response.data;
};
