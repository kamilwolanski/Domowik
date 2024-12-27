import { useQuery } from 'react-query';
import { getShoppingLists } from '../../Api/ShoppingLists';
import { Col, Row } from 'antd';
import AddNewShoppingList from './Add/AddNewShoppingList';
import ShoppingLists from './ShoppingLists';
import ShoppingListsPlaceholder from './Placeholders/ShoppingListsPlaceholder';

const Index: React.FC = () => {
  const { data: shoppingLists, isLoading } = useQuery(
    'shopping-lists',
    getShoppingLists,
  );

  if (isLoading) return <ShoppingListsPlaceholder />;

  return (
    <Row>
      <Col span={8} offset={8}>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Twoje listy zakupów</h2>
          <AddNewShoppingList />
        </div>
        {shoppingLists && shoppingLists?.length > 0 ? (
          <ShoppingLists shoppingLists={shoppingLists} />
        ) : (
          ''
        )}
      </Col>
    </Row>
  );
};

export default Index;
