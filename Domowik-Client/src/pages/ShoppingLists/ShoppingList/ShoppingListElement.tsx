import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ShoppingListProduct } from '../../../Api/ShoppingLists/types';
import { toggleProductPurchased } from '../../../Api/ShoppingLists';
import categoryIcons from '../../../Assets/ProductCategoryIcons/productCategoryIcons';

interface IShoppingListElement extends ShoppingListProduct {
  listId: number;
}

const ShoppingListElement: React.FC<IShoppingListElement> = ({
  listId,
  product,
  quantity,
  isPurchased: initialIsPurchased,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialIsPurchased);
  const liRef = useRef<HTMLLIElement>(null);
  const queryClient = useQueryClient();
  const toggleProductPurchasedMutation = useMutation(toggleProductPurchased);

  const handleClick = async () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      setTimeout(() => {
        liRef.current?.classList.add('is-purchasing');
      }, 0);
    } else {
      setTimeout(() => {
        liRef.current?.classList.add('is-unpurchasing');
      }, 0);
    }

    toggleProductPurchasedMutation.mutate(
      {
        listId: listId,
        productId: product.id,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            liRef.current?.classList.remove('isPurchasing');
            queryClient.refetchQueries({
              queryKey: ['shopping-lists'],
            });
            queryClient.invalidateQueries({
              queryKey: [`shopping-list-${listId}`],
            });
            queryClient.invalidateQueries({
              queryKey: ['available-products'],
            });
          }, 300);
        },
        onError: () => {
          setIsChecked(initialIsPurchased);
        },
      },
    );
  };

  return (
    <li
      className={`mb-3 flex justify-between items-center ${
        isChecked ? 'bought' : ''
      }`}
      ref={liRef}
    >
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`shoppingListEl_${product.id}`}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2"
          checked={isChecked}
          onChange={handleClick}
        />
        <label
          htmlFor={`shoppingListEl_${product.id}`}
          className="text-gray-700 "
        >
          <span className="font-semibold text-base">{product.name}</span>
          <span className="ms-3">{quantity}</span>
        </label>
      </div>
      <div className="flex items-center">
        <img
          src={categoryIcons[product.productCategory.id]}
          className={`${isChecked ? 'grayscale' : ''} w-8`}
        />
      </div>
    </li>
  );
};

export default ShoppingListElement;
