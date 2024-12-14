import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { MdDone } from 'react-icons/md';
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
              <div className="flex items-center">
                {product.isPurchased && <MdDone size={20} color="green" />}

                <span className={`${!product.isPurchased ? 'ms-6' : 'ms-1'}`}>
                  {highlightText(product.name, searchValue)}
                </span>
              </div>
              {product.quantity > 0 ? (
                <div className="flex items-center space-x-2">
                  <button>
                    <CiCirclePlus
                      size={20}
                      onClick={() =>
                        handleClick(paramId, product.id, product.quantity + 1)
                      }
                    />
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() =>
                      handleClick(paramId, product.id, product.quantity - 1)
                    }
                  >
                    <CiCircleMinus color="red" size={20} />
                  </button>
                </div>
              ) : (
                <button>
                  <CiCirclePlus
                    size={20}
                    onClick={() =>
                      handleClick(paramId, product.id, product.quantity + 1)
                    }
                  />
                </button>
              )}
            </li>
          ))}
      </ul>
    );
  }

  return null;
};

export default ProductsToAddList;
