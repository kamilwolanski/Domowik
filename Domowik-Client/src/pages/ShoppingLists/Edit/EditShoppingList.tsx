import { Modal } from 'antd';
import EditShoppingListForm from './EditShoppingListForm';
import { MdEdit } from 'react-icons/md';
import { ShoppingList } from '../../../Api/ShoppingLists/types';
import { useEffect, useState } from 'react';

interface IEditShoppingList {
  shoppingListEl: ShoppingList;
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditShoppingList: React.FC<IEditShoppingList> = ({
  shoppingListEl,
  isEditModalOpen,
  setIsEditModalOpen,
}) => {
  const showModal = () => {
    setIsEditModalOpen(true);
  };

  const handleOk = () => {
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  const [modalWidth, setModalWidth] = useState(500)

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
      <button onClick={showModal} className="w-full text-left">
        <MdEdit size={20} className="inline-block" />
        <span className="text-base ps-2">Zmień nazwę</span>
      </button>
      <Modal
        title="Zmień nazwę listy"
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        width={modalWidth}
      >
        <EditShoppingListForm
          handleCancel={handleCancel}
          shoppingListEl={shoppingListEl}
        />
      </Modal>
    </>
  );
};

export default EditShoppingList;
