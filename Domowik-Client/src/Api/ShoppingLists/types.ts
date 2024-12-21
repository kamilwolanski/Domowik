export type ProductCategory = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  productCategory: ProductCategory;
};

export type ShoppingListProduct = {
  id: number;
  name: string;
  isPurchased: false;
  product: Product;
  quantity: number;
  description?: string;
  unit?: string;
};

export type ShoppingList = {
  id: number;
  name: string;
  shoppingListProducts: ShoppingListProduct[];
};

export type CreateShoppingList = {
  name: string;
};

export type UpdateShoppingList = {
  name: string;
};

export type AvailableProduct = {
  id: number;
  name: string;
  productCategory: ProductCategory;
  quantity: number;
  isPurchased: boolean;
  shoppingListProductId?: number;
  shoppingListProductName?: string;
};

export type AddProductToShoppingList = {
  productId: number;
};

export type UpdateShoppingListProduct = {
  name?: string;
  quantity?: number;
  description?: string;
  unit?: string;
};
