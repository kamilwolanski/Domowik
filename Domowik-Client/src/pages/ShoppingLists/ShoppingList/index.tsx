import { Col, Row } from 'antd';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import ProductsToAdd from '../ProductsToAdd';
import { useEffect, useState } from 'react';

const Index = () => {
  const [colSpan, setColSpan] = useState(9)
  const [addColSpan, setAddColSpan] = useState(5)
  const [colOffset, setColOffest] = useState(0)
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
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setColSpan(24)
        setAddColSpan(24)
        setColOffest(0)
      } else {
        setColSpan(9)
        setAddColSpan(5)
        setColOffest(0)
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('showProductsToAdd', showProductsToAdd.toString());
  }, [showProductsToAdd]);

  return (
    <>
      <Row className="justify-center">
        <Col span={colSpan} offset={colOffset} className="px-2">
          <ShoppingList paramId={Number(id)} />
        </Col>
        {showProductsToAdd && (
          <Col span={addColSpan} offset={colOffset} className="px-2">
            <ProductsToAdd
              closeProductsToAddWindow={closeProductsToAddWindow}
            />
          </Col>
        )}
      </Row>
      {!showProductsToAdd && (
        <button
          onClick={showProductsToAddWindow}
          className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 fixed left-1/2"
        >
          <IoAddCircleSharp size={30} />
          <span className="ml-2">Dodaj produkty</span>
        </button>
      )}
    </>
  );
};

export default Index;
