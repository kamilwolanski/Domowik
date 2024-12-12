import { useQuery, useMutation, useQueryClient } from 'react-query';
import { IoMdAddCircle } from 'react-icons/io';
import { FaMinus } from 'react-icons/fa';
import {
  getAvailableProducts,
  updateProductQuantityInShoppingList,
} from '../../../Api/ShoppingLists';

interface IProductsToAddList {
  paramId: number;
  searchValue: string;
}

const ProductsToAddList: React.FC<IProductsToAddList> = ({
  paramId,
  searchValue,
}) => {
  const { data: availableProducts, isLoading } = useQuery(
    'available-products',
    () => getAvailableProducts(paramId),
  );
  const updateProductQuantityInShoppingListMutation = useMutation(
    updateProductQuantityInShoppingList,
  );
  const queryClient = useQueryClient();

  const handleClick = (listId: number, productId: number, quantity: number) => {
    updateProductQuantityInShoppingListMutation.mutate(
      {
        listId,
        body: {
          productId,
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
          console.log('success');
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
        {availableProducts
          .filter((product) =>
            product.name.toLocaleLowerCase().includes(searchValue),
          )
          .map((product) => (
            <li
              key={product.id}
              className="p-2 border-b last:border-b-0 border-gray-200 hover:bg-gray-100 bg-gray-50 flex justify-between"
            >
              <button
                onClick={() =>
                  handleClick(paramId, product.id, product.quantity + 1)
                }
                className="flex items-center cursor-pointer"
              >
                <IoMdAddCircle />
                <span className="ms-3">
                  <span className="ms-3">
                    {highlightText(product.name, searchValue)}
                  </span>
                </span>
              </button>
              {product.quantity > 0 && (
                <div className="flex items-center space-x-2">
                  <span>{product.quantity}</span>
                  <button
                    onClick={() =>
                      handleClick(paramId, product.id, product.quantity - 1)
                    }
                  >
                    <FaMinus color="red" />
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
