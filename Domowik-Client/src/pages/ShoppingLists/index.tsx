import { useQuery } from 'react-query';
import { getShoppingLists } from '../../Api/ShoppingLists';
import { Col, Row } from 'antd';
import AddNewShoppingList from './AddNewShoppingList';
import ShoppingLists from './ShoppingLists';

const ShoppingList: React.FC = () => {
  const { data: shoppingLists, isLoading } = useQuery(
    'shopping-lists',
    getShoppingLists,
  );

  if (isLoading) return <p>Ładowanie...</p>;

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

export default ShoppingList;
