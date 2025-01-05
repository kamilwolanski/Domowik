import { useQuery } from 'react-query';
import { getShoppingLists } from '../../Api/ShoppingLists';
import { Col, Row } from 'antd';
import AddNewShoppingList from './Add/AddNewShoppingList';
import ShoppingLists from './ShoppingLists';
import ShoppingListsPlaceholder from './Placeholders/ShoppingListsPlaceholder';
import { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const { data: shoppingLists, isLoading } = useQuery(
    'shopping-lists',
    getShoppingLists,
  );

  const [colSpan, setColSpan] = useState(8)
  const [colOffset, setColOffest] = useState(8)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setColSpan(24)
        setColOffest(0)
      } else {
        setColSpan(8)
        setColOffest(8)
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) return <ShoppingListsPlaceholder />;

  return (
    <Row>
      <Col span={colSpan} offset={colOffset}>
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
    </Row >
  );
};

export default Index;
