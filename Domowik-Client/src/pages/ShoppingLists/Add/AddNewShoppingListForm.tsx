import { Formik, Form, FormikHelpers } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { createShoppingList } from '../../../Api/ShoppingLists';

import TextInput from '../../../Components/FormikInputs/FormikTextInput';
import validationSchema from './validationSchema';

interface IAddNewShoppingListForm {
  handleCancel: () => void;
}

const AddNewShoppingListForm: React.FC<IAddNewShoppingListForm> = ({
  handleCancel,
}) => {
  const initialValues = {
    name: '',
  };

  const queryClient = useQueryClient();
  const createNewShopppingListMutation = useMutation(createShoppingList);

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>,
  ) => {
    createNewShopppingListMutation.mutate(
      {
        name: values.name,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['shopping-lists'] });
          formikHelpers.resetForm();
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
            <TextInput label="Nazwa listy zakupów" name="name" id="name" />
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
                Dodaj
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddNewShoppingListForm;
