import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { ShoppingList } from '../../Api/ShoppingLists/types';
import ShoppingListsElement from './ShoppingListsElement';

interface IShoppingLists {
  shoppingLists: ShoppingList[];
}

const ShoppingLists: React.FC<IShoppingLists> = ({ shoppingLists }) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shoppingLists.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const totalPages = Math.ceil(shoppingLists.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [shoppingLists, currentPage, itemsPerPage]);

  return (
    <div className="mt-10">
      {currentItems.map((shoppingList) => (
        <ShoppingListsElement
          shoppingListEl={shoppingList}
          key={shoppingList.id}
        />
      ))}

      {shoppingLists.length > itemsPerPage && (
        <Pagination
          current={currentPage}
          total={shoppingLists.length}
          pageSize={itemsPerPage}
          onChange={onPageChange}
          showSizeChanger={false}
          className="ant-pagination-end"
        />
      )}
    </div>
  );
};

export default ShoppingLists;
