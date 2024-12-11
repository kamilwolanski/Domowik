import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { IoIosClose } from 'react-icons/io';
import { ShoppingListProduct } from '../../../Api/ShoppingLists/types';
import {
  toggleProductPurchased,
  updateProductQuantityInShoppingList,
} from '../../../Api/ShoppingLists';

interface IShoppingListElement extends ShoppingListProduct {
  listId: number;
}

const ShoppingListElement: React.FC<IShoppingListElement> = ({
  listId,
  product,
  quantity,
  isPurchased,
}) => {
  const queryClient = useQueryClient();
  const toggleProductPurchasedMutation = useMutation(toggleProductPurchased);
  const updateProductQuantityInShoppingListMutation = useMutation(
    updateProductQuantityInShoppingList,
  );

  const handleClick = async () => {
    toggleProductPurchasedMutation.mutate(
      {
        listId: listId,
        productId: product.id,
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: ['shopping-lists'],
          });

          queryClient.invalidateQueries({
            queryKey: [`shopping-list-${listId}`],
          });
        },
      },
    );
  };

  const handleDelete = () => {
    updateProductQuantityInShoppingListMutation.mutate(
      {
        listId,
        body: {
          productId: product.id,
          quantity: 0,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`shopping-list-${listId}`],
          });
          queryClient.invalidateQueries({
            queryKey: ['available-products'],
          });
          console.log('success');
        },
      },
    );
  };

  return (
    <li className="mb-3 flex justify-between">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`shoppingListEl_${product.id}`}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2"
          checked={isPurchased}
          onChange={handleClick}
        />
        <label
          htmlFor={`shoppingListEl_${product.id}`}
          className="text-gray-700"
        >
          {product.name} {quantity}
        </label>
      </div>
      <button onClick={handleDelete}>
        <IoIosClose size={25} color="red" />
      </button>
    </li>
  );
};

export default ShoppingListElement;
