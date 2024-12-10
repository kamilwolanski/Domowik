import { ShoppingList } from '../../Api/ShoppingLists/types';
import ShoppingListsElement from './ShoppingListsElement';

interface IShoppingLists {
  shoppingLists: ShoppingList[];
}

const ShoppingLists: React.FC<IShoppingLists> = ({ shoppingLists }) => {
  return (
    <div className="mt-10">
      {shoppingLists.map((shoppingList) => (
        <ShoppingListsElement
          shoppingListEl={shoppingList}
          key={shoppingList.id}
        />
      ))}
    </div>
  );
};

export default ShoppingLists;
