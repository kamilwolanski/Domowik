import { Progress } from 'antd';
import { useQuery } from 'react-query';
import { getShoppingList } from '../../../Api/ShoppingLists/index';
import ShoppingListElement from './ShoppingListElement';
import { calculateProgress } from './helpers';

interface IShoppingList {
  paramId: number;
}

const ShoppingList: React.FC<IShoppingList> = ({ paramId }) => {
  const { data: shoppingList, isLoading } = useQuery(
    `shopping-list-${paramId}`,
    () => getShoppingList(paramId),
  );
  console.log('shoppingList', shoppingList);

  if (isLoading) return <p>Ładowanie...</p>;
  if (shoppingList) {
    return (
      <div className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{shoppingList?.name}</h2>
        </div>
        <Progress
          percent={calculateProgress(shoppingList.shoppingListProducts)}
          showInfo={false}
        />
        <div>
          {shoppingList?.shoppingListProducts.length > 0 ? (
            <ul className="mt-5">
              {shoppingList.shoppingListProducts.map((product) => (
                <ShoppingListElement
                  listId={shoppingList.id}
                  {...product}
                  key={product.id}
                />
              ))}
            </ul>
          ) : (
            <p>Brak produktów</p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ShoppingList;
