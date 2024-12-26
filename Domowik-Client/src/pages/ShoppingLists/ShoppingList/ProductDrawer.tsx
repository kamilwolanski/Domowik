import { useMutation, useQueryClient } from 'react-query';
import { Drawer } from 'antd';
import { Col, Row } from 'antd';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';
import { MdDeleteForever } from 'react-icons/md';
import TextInput from '../../../Components/FormikInputs/FormikTextInput';
import FormikTextarea from '../../../Components/FormikInputs/FormikTextArea';

import { ShoppingListProduct } from '../../../Api/ShoppingLists/types';
import {
  updateProductInShoppingList,
  removeProductFromShoppingList,
} from '../../../Api/ShoppingLists';
import { useState } from 'react';

interface IProductDrawer {
  closeDrawer: () => void;
  listId: number;
  openDrawer: boolean;
  product: ShoppingListProduct;
}

const ProductDrawer: React.FC<IProductDrawer> = ({
  listId,
  openDrawer,
  closeDrawer,
  product,
}) => {
  const initialValues = {
    name: product.name,
    quantity: product.quantity,
    unit: product.unit,
    description: product.description,
  };

  const updateProductInShoppingListMutation = useMutation(
    updateProductInShoppingList,
  );

  const removeProductFromShoppingListMutation = useMutation(
    removeProductFromShoppingList,
  );

  const queryClient = useQueryClient();

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const showModal = () => {
    setShowConfirmDelete(true);
  };

  const handleOk = () => {
    handleDelete();
    setShowConfirmDelete(false);
  };

  const handleCancel = () => {
    setShowConfirmDelete(false);
  };

  const handleSubmit = (values: typeof initialValues) => {
    if (+values.quantity === 0) {
      showModal();
    } else {
      updateProductInShoppingListMutation.mutate(
        {
          listId,
          shoppingListProductId: product.id,
          body: values,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`shopping-list-${listId}`],
            });
            queryClient.invalidateQueries({
              queryKey: ['available-products'],
            });
            closeDrawer();
          },
        },
      );
    }
  };

  const handleDelete = () => {
    removeProductFromShoppingListMutation.mutate(
      {
        listId,
        shoppingListProductId: product.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`shopping-list-${listId}`],
          });
          queryClient.invalidateQueries({
            queryKey: ['available-products'],
          });
          closeDrawer();
        },
      },
    );
  };

  return (
    <Drawer
      title={product.product.name}
      onClose={closeDrawer}
      open={openDrawer}
    >
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <>
              <Form className="h-full flex flex-col justify-between">
                <div>
                  <TextInput label="Nazwa" name="name" id="name" />
                  <Row gutter={12}>
                    <Col span={12}>
                      <TextInput label="Ilość" name="quantity" id="quantity" />
                    </Col>
                    <Col span={12}>
                      <TextInput
                        label="Jednostka"
                        name="unit"
                        id="unit"
                        placeholder="np. kg"
                      />
                    </Col>
                  </Row>
                  <FormikTextarea
                    label="Opis"
                    name="description"
                    id="description"
                    rows={10}
                  />
                  <button
                    className="flex items-center"
                    onClick={handleDelete}
                    type="button"
                  >
                    <MdDeleteForever size={20} color="#ff5555" />
                    <span className="font-semibold text-xs">Usuń produkt</span>
                  </button>
                </div>

                <div className="pt-5 before:content-[''] before:block before:absolute before:left-0 before:h-px before:bg-neutral-300 before:transform before:-translate-y-6 before:w-full">
                  <button
                    className="bg-blue-600 w-full text-white text-lg font-bold py-2 px-10 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="submit"
                  >
                    <span className="ml-2">Zapisz</span>
                  </button>
                </div>
              </Form>

              <Modal
                title="Czy na pewno chcesz usunąć produkt?"
                open={showConfirmDelete}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="Anuluj"
                okText="Usuń"
              >
                <h3>
                  Wprowadzenie ilości równej{' '}
                  <span className="font-semibold">0</span> spowoduje usunięcie
                  tego produktu z listy zakupów. Czy na pewno chcesz
                  kontynuować?
                </h3>
              </Modal>
            </>
          );
        }}
      </Formik>
    </Drawer>
  );
};

export default ProductDrawer;
