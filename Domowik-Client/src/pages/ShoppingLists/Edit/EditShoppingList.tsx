import { Modal } from 'antd';
import EditShoppingListForm from './EditShoppingListForm';
import { MdEdit } from 'react-icons/md';
import { ShoppingList } from '../../../Api/ShoppingLists/types';

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
