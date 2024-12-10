import { useQuery, useMutation } from 'react-query';
import { IoMdAddCircle } from 'react-icons/io';
import {
  getAvailableProducts,
  addProductToShoppingList,
} from '../../../Api/ShoppingLists';

interface IProductsToAddList {
  paramId: number;
}

const ProductsToAddList: React.FC<IProductsToAddList> = ({ paramId }) => {
  const { data: availableProducts, isLoading } = useQuery(
    'available-products',
    () => getAvailableProducts(paramId),
  );
  const addProductToShoppingListMutation = useMutation(
    addProductToShoppingList,
  );

  const handleClick = async (
    listId: number,
    productId: number,
    quantity: number,
  ) => {
    await addProductToShoppingListMutation.mutate(
      {
        listId,
        body: {
          productId,
          quantity,
        },
      },
      {
        onSuccess: () => {
          console.log('success');
        },
      },
    );
  };

  if (isLoading) return <p>Loading...</p>;

  if (availableProducts) {
    return (
      <ul className="max-h-64 overflow-y-auto border border-gray-300 rounded-md p-4 shadow-lg mt-4 bg-gray-50 scrollbar-thin">
        {availableProducts.map((product) => (
          <li
            key={product.id}
            className="p-2 border-b last:border-b-0 border-gray-200 hover:bg-gray-100 bg-gray-50 cursor-pointer"
          >
            <button
              onClick={() =>
                handleClick(paramId, product.id, product.quantity + 1)
              }
              className="flex items-center"
            >
              <IoMdAddCircle />
              <span className="ms-3">{product.name}</span>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default ProductsToAddList;
