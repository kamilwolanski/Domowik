import { useState } from 'react';
import { Progress, Popover } from 'antd';
import { CiCircleMore } from 'react-icons/ci';
import { ShoppingList } from '../../Api/ShoppingLists/types';
import { MdDelete } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { deleteShoppingList } from '../../Api/ShoppingLists';
import EditShoppingList from './Edit/EditShoppingList';

interface IShoppingListsElement {
  shoppingListEl: ShoppingList;
}

const ShoppingListsElement: React.FC<IShoppingListsElement> = ({
  shoppingListEl,
}) => {
  const queryClient = useQueryClient();
  const deleteShoppingListMutation = useMutation(deleteShoppingList);
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

  // const handleEditName = () => {};

  return (
    <>
      <div
        key={shoppingListEl.id}
        className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">{shoppingListEl.name}</span>
          <Popover
            content={
              <div className="flex flex-col items-start">
                <EditShoppingList shoppingListEl={shoppingListEl} />
                <button onClick={handleDelete} className="text-red-600">
                  <MdDelete size={20} className="inline-block" />
                  <span className="text-base ps-2">Usuń</span>
                </button>
              </div>
            }
            trigger="click"
            open={openPopover}
            onOpenChange={handleOpenChange}
            arrow={false}
            placement="bottomRight"
            overlayInnerStyle={{ marginTop: '10px', minWidth: '180px' }}
          >
            <button className="pointer">
              <CiCircleMore size={24} color="#211f1f" />
            </button>
          </Popover>
        </div>
        <Progress percent={90} showInfo={false} />
      </div>
    </>
  );
};

export default ShoppingListsElement;
