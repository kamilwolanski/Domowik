import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ShoppingListProduct } from '../../../Api/ShoppingLists/types';
import { toggleProductPurchased } from '../../../Api/ShoppingLists';
import categoryIcons from '../../../Assets/ProductCategoryIcons/productCategoryIcons';
import ProductDrawer from './ProductDrawer';

interface IShoppingListElement {
  listId: number;
  lastEl?: boolean;
  product: ShoppingListProduct;
}

const ShoppingListElement: React.FC<IShoppingListElement> = ({
  listId,
  product,
  lastEl,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(product.isPurchased);
  const liRef = useRef<HTMLLIElement>(null);
  const queryClient = useQueryClient();
  const toggleProductPurchasedMutation = useMutation(toggleProductPurchased);

  const [openDrawer, setDrawerOpen] = useState(false);

  const handleChange = async () => {
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
        productId: product.product.id,
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
          setIsChecked(product.isPurchased);
        },
      },
    );
  };

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <li
        className={`${lastEl ? '' : 'py-1'} px-3 flex justify-between items-center hover:bg-gray-50 rounded-lg cursor-pointer ${
          product.isPurchased ? 'bought hover:bg-green-200 px-3' : ''
        }`}
        ref={liRef}
        onClick={showDrawer}
      >
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`shoppingListEl_${product.id}`}
            className="w-4 h-4 accent-pink-500 text-green-600 rounded focus:ring-0 cursor-pointer"
            checked={isChecked}
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()}
          />
          <label className="text-gray-700 cursor-pointer">
            <span className="font-semibold text-base">{product.name}</span>
            <span className="ms-3">{product.quantity}</span>
            <span className="ms-1">{product.unit}</span>
          </label>
        </div>
        <div className="flex items-center">
          <img
            src={categoryIcons[product.product.productCategory.id]}
            className={`${isChecked ? 'grayscale' : ''} w-8`}
          />
        </div>
      </li>

      <ProductDrawer
        closeDrawer={closeDrawer}
        listId={listId}
        openDrawer={openDrawer}
        product={product}
      />
    </>
  );
};

export default ShoppingListElement;
