import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Progress, Popover } from 'antd';
import { CiCircleMore } from 'react-icons/ci';
import { ShoppingList } from '../../Api/ShoppingLists/types';
import { MdDelete } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { deleteShoppingList } from '../../Api/ShoppingLists';
import EditShoppingList from './Edit/EditShoppingList';
import { calculateProgress } from './ShoppingList/helpers';

interface IShoppingListsElement {
  shoppingListEl: ShoppingList;
}

const ShoppingListsElement: React.FC<IShoppingListsElement> = ({
  shoppingListEl,
}) => {
  const queryClient = useQueryClient();
  const deleteShoppingListMutation = useMutation(deleteShoppingList);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const hide = () => {
    setOpenPopover(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  const handleDelete = () => {
    deleteShoppingListMutation.mutate(shoppingListEl.id, {
      onSuccess: () => {
        hide();
        queryClient.invalidateQueries({ queryKey: ['shopping-lists'] });
      },
    });
  };

  return (
    <Link
      to={`/shopping-lists/${shoppingListEl.id}`}
      onClick={(event) => {
        if (openPopover || isEditModalOpen) {
          event.preventDefault(); // Zatrzymaj nawigację, jeśli Popover jest otwarty
        }
      }}
    >
      <div
        key={shoppingListEl.id}
        className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8 hover:bg-gray-100"
        onClick={() => console.log('dupa')}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{shoppingListEl.name}</h2>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500">
              {
                shoppingListEl.shoppingListProducts.filter(
                  (el) => el.isPurchased,
                ).length
              }
              /{shoppingListEl.shoppingListProducts.length}
            </p>
            <Popover
              content={
                <div className="flex flex-col items-start">
                  <EditShoppingList
                    shoppingListEl={shoppingListEl}
                    isEditModalOpen={isEditModalOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                  />
                  <button onClick={handleDelete} className="text-red-600">
                    <MdDelete size={20} className="inline-block" />
                    <span className="text-base ps-2">Usuń</span>
                  </button>
                </div>
              }
              trigger="click"
              fresh
              open={openPopover}
              onOpenChange={handleOpenChange}
              arrow={false}
              placement="bottomRight"
              overlayInnerStyle={{ marginTop: '10px', minWidth: '180px' }}
            >
              <button
                className="pointer ms-3"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                <CiCircleMore size={24} color="#211f1f" />
              </button>
            </Popover>
          </div>
        </div>
        <Progress
          percent={calculateProgress(shoppingListEl.shoppingListProducts)}
          showInfo={false}
        />
      </div>
    </Link>
  );
};

export default ShoppingListsElement;
