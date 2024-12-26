import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';

import {
  getAvailableProducts,
  addProductToShoppingList,
  updateProductInShoppingList,
  removeProductFromShoppingList,
} from '../../../Api/ShoppingLists';
import useDebounce from '../../../Hooks/useDebounce';

interface IProductsToAddList {
  paramId: number;
  searchValue: string;
}

const ProductsToAddList: React.FC<IProductsToAddList> = ({
  paramId,
  searchValue,
}) => {
  const debouncedSearchTerm = useDebounce(searchValue, 200);
  const { data: availableProducts, isLoading } = useQuery({
    queryKey: ['available-products', debouncedSearchTerm],
    queryFn: () => getAvailableProducts(paramId, debouncedSearchTerm, 30),
  });
  const addProductToShoppingListMutation = useMutation(
    addProductToShoppingList,
  );

  const updateProductInShoppingListMutation = useMutation(
    updateProductInShoppingList,
  );

  const removeProductFromShoppingListMutation = useMutation(
    removeProductFromShoppingList,
  );

  const queryClient = useQueryClient();

  const addToShoppingList = (listId: number, productId: number) => {
    addProductToShoppingListMutation.mutate(
      {
        listId,
        body: {
          productId,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`shopping-list-${paramId}`],
          });
          queryClient.invalidateQueries({
            queryKey: ['available-products'],
          });
        },
      },
    );
  };

  const updateQuantityProduct = (
    listId: number,
    shoppingListProductId: number,
    quantity: number,
  ) => {
    if (quantity === 0) {
      handleDelete(listId, shoppingListProductId);
    } else {
      updateProductInShoppingListMutation.mutate(
        {
          listId,
          shoppingListProductId,
          body: {
            quantity,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`shopping-list-${paramId}`],
            });
            queryClient.invalidateQueries({
              queryKey: ['available-products'],
            });
          },
        },
      );
    }
  };

  const handleDelete = (listId: number, shoppingListProductId: number) => {
    removeProductFromShoppingListMutation.mutate(
      {
        listId,
        shoppingListProductId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`shopping-list-${listId}`],
          });
          queryClient.invalidateQueries({
            queryKey: ['available-products'],
          });
        },
      },
    );
  };

  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, 'gi'); // 'gi' - case insensitive
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-bold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  if (isLoading) return <p>Loading...</p>;

  if (availableProducts) {
    return (
      <ul className="max-h-64 overflow-y-auto border border-gray-300 rounded-md p-4 shadow-lg mt-4 bg-gray-50 scrollbar-thin">
        {availableProducts.map((product) => (
          <li
            key={product.id}
            className="p-2 border-b last:border-b-0 border-gray-200 hover:bg-gray-100 bg-gray-50 flex justify-between"
          >
            <div className="flex items-center">
              {product.isPurchased ? (
                <IoCheckmarkDoneCircleOutline color="#16a34a" size={20} />
              ) : (
                <button>
                  <CiCirclePlus
                    size={20}
                    color={product.quantity > 0 ? '#004699' : ''}
                    onClick={() =>
                      product.quantity === 0
                        ? addToShoppingList(paramId, product.id)
                        : product.shoppingListProductId &&
                          updateQuantityProduct(
                            paramId,
                            product.shoppingListProductId,
                            product.quantity + 1,
                          )
                    }
                  />
                </button>
              )}

              <span className="ms-2">
                {highlightText(
                  product.shoppingListProductName
                    ? product.shoppingListProductName
                    : product.name,
                  searchValue,
                )}
              </span>
            </div>
            {product.quantity > 0 && (
              <div className="flex items-center space-x-2">
                <span>{product.quantity}</span>
                <button
                  onClick={() =>
                    product.shoppingListProductId &&
                    updateQuantityProduct(
                      paramId,
                      product.shoppingListProductId,
                      product.quantity - 1,
                    )
                  }
                >
                  <CiCircleMinus color="red" size={20} />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default ProductsToAddList;
