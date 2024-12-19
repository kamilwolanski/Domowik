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

  const unPurchasedProducts = shoppingList?.shoppingListProducts.filter(
    (product) => !product.isPurchased,
  );
  const purchasedProducts = shoppingList?.shoppingListProducts.filter(
    (product) => product.isPurchased,
  );

  if (isLoading) return <p>Ładowanie...</p>;

  if (shoppingList && unPurchasedProducts && purchasedProducts) {
    return (
      <div className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{shoppingList?.name}</h2>
        </div>
        <Progress
          percent={calculateProgress(shoppingList.shoppingListProducts)}
          showInfo={false}
          strokeColor={
            calculateProgress(shoppingList.shoppingListProducts) === 100
              ? '#16a34a'
              : '#5aacff'
          }
        />
        {unPurchasedProducts.length <= 0 && purchasedProducts.length <= 0 && (
          <p>Brak produktów</p>
        )}
        <div>
          {unPurchasedProducts?.length > 0 && (
            <ul className="mt-5 shopping-list px-2">
              {unPurchasedProducts.map((product) => (
                <ShoppingListElement
                  listId={shoppingList.id}
                  product={product}
                  key={product.id}
                />
              ))}
            </ul>
          )}
          {purchasedProducts?.length > 0 && (
            <>
              <div className="bg-green-100 rounded-lg">
                <ul className="mt-5 shopping-list py-4 px-2">
                  {purchasedProducts.map((product, index) => (
                    <ShoppingListElement
                      listId={shoppingList.id}
                      // {...product}
                      product={product}
                      key={product.id}
                      lastEl={purchasedProducts.length - 1 === index}
                    />
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ShoppingList;
