import React, { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Container } from 'reactstrap';
import { getShoppingList, updateShoppingList } from '../Api';

type Item = {
  id: string;
  name: string;
  count: number;
};

const ShoppingList: React.FC = () => {
  const updateShoppingListMutation = useMutation(updateShoppingList);
  const { data, isLoading } = useQuery('shopping-list', getShoppingList);
  const queryClient = useQueryClient();

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemCount, setItemCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [editedItem, setEditedItem] = useState('');

  useEffect(() => {
    setItems(items.filter((item) => item.count > 0 && item.name != ''));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setItems(data.data);
    }
  }, [isLoading]);

  useEffect(() => {
    const mappedItems = items.map((item) => ({
      name: item.name,
      count: item.count,
    }));

    updateShoppingListMutation.mutate(mappedItems, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['shopping-list'] });
      },
    });
  }, [items]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitValue = () => {
    const index = items.findIndex((item) => item.id === editedItem);
    const item = items[index];
    const newItem = { ...item, count: Number(value) };

    setItems([...items.slice(0, index), newItem, ...items.slice(index + 1)]);
    handleClose();
  };

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const editItem = (updatedItem: Item) => {
    handleOpen();
    setEditedItem(updatedItem.id);
  };

  const selectItem = (item: Item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const unselectItem = (item: Item) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem.id !== item.id),
    );
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    item: Item,
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      selectItem(item);
    } else {
      unselectItem(item);
    }
  };

  const deleteSelectedItems = () => {
    setItems(items.filter((item) => !selectedItems.includes(item)));
    setSelectedItems([]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addItem({ id: Date.now().toString(), name: itemName, count: itemCount });
    setItemName('');
    setItemCount(0);
  };

  return (
    <Container className="shopping-list-page">
      <h1 className="text-center">Listy zakupów</h1>
      <div className="text-center mt-3">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Nazwa"
          />
          <input
            className="form-control mt-2"
            value={itemCount}
            onChange={(e) => setItemCount(Number(e.target.value))}
            placeholder="Ilość"
          />
          <button className="btn btn-primary mt-2" type="submit">
            Dodaj
          </button>
        </form>
        {items.map((item) => (
          <div className="text-center mt-3 container" key={item.id}>
            <div className="col">
              <div className="row">
                <span className="col mt-2">Nazwa: {item.name}</span>
                <div className="col">
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeItem(item.id)}
                  >
                    Usuń
                  </button>

                  <input
                    className="mt-2 ms-2"
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, item)}
                  />
                </div>
              </div>

              <div className="row">
                <span className="col mt-2">Ilość: {item.count}</span>
                <div className="col">
                  <button
                    className="btn btn-primary mt-2 mb-2"
                    onClick={() => editItem(item)}
                  >
                    Edytuj
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {selectedItems.length > 0 && (
          <button className="btn btn-danger mt-3" onClick={deleteSelectedItems}>
            Usuń zaznaczone
          </button>
        )}
      </div>
      {isOpen && (
        <div className="row mt-4">
          <input
            className="form-control col"
            type="number"
            value={value}
            onChange={handleChange}
          />
          <button
            className="btn btn-primary col ms-2"
            onClick={handleSubmitValue}
          >
            OK
          </button>
          <button className="btn btn-secondary col ms-2" onClick={handleClose}>
            Zamknij
          </button>
        </div>
      )}
    </Container>
  );
};

export default ShoppingList;
