import { ShoppingListProduct } from '../../../Api/ShoppingLists/types';

export const calculateProgress = (
  shoppingListProducts: ShoppingListProduct[],
) => {
  const itemsPurchasedCount = shoppingListProducts.filter(
    (product) => product.isPurchased,
  ).length;
  const allItemsCount = shoppingListProducts.length;

  return (itemsPurchasedCount / allItemsCount) * 100;
};
