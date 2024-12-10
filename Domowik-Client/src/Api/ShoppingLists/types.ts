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
  isPurchased: false;
  product: Product;
  quantity: number;
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
};

export type AddProductToShoppingList = {
  productId: number;
  quantity: number;
};
