import { Col, Progress, Row } from 'antd';
import { IoAddCircleSharp } from 'react-icons/io5';

const ShoppingListsPlaceholder = () => {
  return (
    <Row>
      <Col span={8} offset={8}>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Twoje listy zakupów</h2>
          <button
            className="flex items-center bg-gray-400 animate-pulse text-gray-200 py-2 px-4 rounded-lg cursor-not-allowed"
            disabled
          >
            <IoAddCircleSharp size={30} />
            <span className="ml-2">Stwórz nową listę</span>
          </button>
        </div>
        <div className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="flex items-center justify-between">
              <div className="h-2 bg-gray-200 rounded-full w-5"></div>
            </div>
          </div>
          <Progress
            className="animate-pulse"
            percent={60}
            showInfo={false}
            strokeColor="#d4d5d7"
          />
        </div>
        <div className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="flex items-center justify-between">
              <div className="h-2 bg-gray-200 rounded-full w-5"></div>
            </div>
          </div>
          <Progress
            className="animate-pulse"
            percent={70}
            showInfo={false}
            strokeColor="#d4d5d7"
          />
        </div>
        <div className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="flex items-center justify-between">
              <div className="h-2 bg-gray-200 rounded-full w-5"></div>
            </div>
          </div>
          <Progress
            className="animate-pulse"
            percent={40}
            showInfo={false}
            strokeColor="#d4d5d7"
          />
        </div>
      </Col>
    </Row>
  );
};

export default ShoppingListsPlaceholder;
