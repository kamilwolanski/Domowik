import { useState } from 'react';
import { Modal } from 'antd';
import EditShoppingListForm from './EditShoppingListForm';
import { MdEdit } from 'react-icons/md';
import { ShoppingList } from '../../../Api/ShoppingLists/types';

interface IEditShoppingList {
  shoppingListEl: ShoppingList;
}

const EditShoppingList: React.FC<IEditShoppingList> = ({ shoppingListEl }) => {
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
      <button onClick={showModal} className="mb-2">
        <MdEdit size={20} className="inline-block" />
        <span className="text-base ps-2">Zmień nazwę</span>
      </button>
      <Modal
        title="Zmień nazwę listy"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        style={{ left: 80 }}
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
