import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { IoAddCircleSharp } from 'react-icons/io5';
import AddNewShoppingListForm from './AddNewShoppingListForm';

const AddNewShoppingList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState(500)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setModalWidth(364)
      } else {
        setModalWidth(500)
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        width={modalWidth}
      >
        <AddNewShoppingListForm handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default AddNewShoppingList;
