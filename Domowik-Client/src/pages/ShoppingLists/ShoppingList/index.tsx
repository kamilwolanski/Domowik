import { Col, Row } from 'antd';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import ProductsToAdd from '../ProductsToAdd';
import { useEffect, useState } from 'react';

const Index = () => {
  const { id } = useParams();

  const [showProductsToAdd, setShowProductsToAdd] = useState(() => {
    const savedState = sessionStorage.getItem('showProductsToAdd');
    return savedState === 'true';
  });

  const showProductsToAddWindow = () => {
    setShowProductsToAdd(true);
  };

  const closeProductsToAddWindow = () => {
    setShowProductsToAdd(false);
  };

  useEffect(() => {
    sessionStorage.setItem('showProductsToAdd', showProductsToAdd.toString());
  }, [showProductsToAdd]);

  return (
    <>
      <Row className="justify-center">
        <Col span={9} className="px-2">
          <ShoppingList paramId={Number(id)} />
        </Col>
        {showProductsToAdd && (
          <Col span={5} className="px-2">
            <ProductsToAdd
              closeProductsToAddWindow={closeProductsToAddWindow}
            />
          </Col>
        )}
      </Row>
      {!showProductsToAdd && (
        <button
          onClick={showProductsToAddWindow}
          className="flex items-center bg-blue-600 text-white text-lg font-bold py-2 px-10 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 fixed left-1/2"
        >
          <IoAddCircleSharp size={40} />
          <span className="ml-2">Dodaj produkty</span>
        </button>
      )}
    </>
  );
};

export default Index;
