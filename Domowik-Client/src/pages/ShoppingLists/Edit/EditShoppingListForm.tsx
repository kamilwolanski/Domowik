import { Formik, Form } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import validationSchema from './validationSchema';
import TextInput from '../../../Components/FormikInputs/FormikTextInput';
import { updateShoppingList } from '../../../Api/ShoppingLists';
import { ShoppingList } from '../../../Api/ShoppingLists/types';

interface IEditShoppingListForm {
  handleCancel: () => void;
  shoppingListEl: ShoppingList;
}

const EditShoppingListForm: React.FC<IEditShoppingListForm> = ({
  handleCancel,
  shoppingListEl,
}) => {
  const initialValues = {
    name: shoppingListEl.name,
  };

  const queryClient = useQueryClient();
  const updateShopppingListMutation = useMutation(updateShoppingList);

  const handleSubmit = (values: typeof initialValues) => {
    updateShopppingListMutation.mutate(
      {
        id: shoppingListEl.id,
        body: {
          name: values.name,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['shopping-lists'] });
          handleCancel();
        },
      },
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => {
        return (
          <Form>
            <TextInput label="" name="name" id="name" />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCancel}
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none"
              >
                Anuluj
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className={`px-4 py-2 rounded-lg focus:outline-none ml-2 ${
                  isValid
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                Zapisz
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditShoppingListForm;
