import { ShoppingList } from '../../Api/ShoppingLists/types';
import ShoppingListsElement from './ShoppingListsElement';
import { useState } from 'react';
import { Pagination } from 'antd'; // Importowanie komponentu Pagination z Ant Design

interface IShoppingLists {
  shoppingLists: ShoppingList[];
}

const ShoppingLists: React.FC<IShoppingLists> = ({ shoppingLists }) => {
  const itemsPerPage = 4; // Liczba elementów na jednej stronie
  const [currentPage, setCurrentPage] = useState(1); // Stan aktualnej strony
  
  // Obliczanie indeksów początkowego i końcowego elementu na podstawie bieżącej strony
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shoppingLists.slice(indexOfFirstItem, indexOfLastItem); // Pobieranie tylko elementów dla bieżącej strony

  // Funkcja do przechodzenia między stronami
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-10">
      {/* Wyświetlanie aktualnych elementów */}
      {currentItems.map((shoppingList) => (
        <ShoppingListsElement
          shoppingListEl={shoppingList}
          key={shoppingList.id}
        />
      ))}

      {/* Paginacja z Ant Design */}
      <Pagination
        current={currentPage} // Aktualna strona
        total={shoppingLists.length} // Całkowita liczba elementów
        pageSize={itemsPerPage} // Liczba elementów na stronie
        onChange={onPageChange} // Funkcja wywoływana po zmianie strony
        showSizeChanger={false} // Opcjonalnie, można dodać wybór liczby elementów na stronę
        className="ant-pagination-end" // Klasa do stosowania własnych stylów
      />
    </div>
  );
};

export default ShoppingLists;
