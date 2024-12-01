import { useQuery } from 'react-query';
import { getShoppingLists } from '../../Api/api';
import { Col, Row } from 'antd';

const ShoppingList: React.FC = () => {
  const { data, isLoading } = useQuery('shopping-list', getShoppingLists);

  console.log('data', data);
  if (isLoading) return <p>Ładowanie...</p>;

  return (
    <Row>
      <Col span={12} offset={6} className="text-center">
        col-12 col-offset-6
      </Col>
    </Row>
  );
};

export default ShoppingList;
