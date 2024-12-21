import { useState } from 'react';
import { Modal } from 'antd';
import { IoAddCircleSharp } from 'react-icons/io5';
import AddNewShoppingListForm from './AddNewShoppingListForm';

const AddNewShoppingList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={showModal}
        className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <IoAddCircleSharp size={30} />
        <span className="ml-2">Stwórz nową listę</span>
      </button>

      <Modal
        title="Stwórz Nową liste zakupów"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        style={{ left: 80 }}
      >
        <AddNewShoppingListForm handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default AddNewShoppingList;
