import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../../Components/FormikInputs/FormikTextInput';
import NumberInput from '../../Components/FormikInputs/FormikNumberInput';
import SelectInput from '../../Components/FormikInputs/FormikSelectInput';
import validationSchema from './validationSchema';

import { useMutation, useQueryClient } from 'react-query';
import { addTransaction } from '../../Api/api';
import { TransactionCategory, TransactionCategoryType } from '../../Api/types';

interface IAddNewTransactionForm {
  handleCancel: () => void;
  isIncome: boolean;
  transactionCategoriesData: TransactionCategory[];
}

const AddNewTransactionForm: React.FC<IAddNewTransactionForm> = ({
  handleCancel,
  isIncome,
  transactionCategoriesData,
}) => {
  const initialValues = {
    name: '',
    count: '',
    category: '',
  };

  const queryClient = useQueryClient();
  const addNewTransactionMutation = useMutation(addTransaction);

  const transactionCategories = transactionCategoriesData.filter(
    (transactionCategoryData) =>
      isIncome
        ? transactionCategoryData.type === TransactionCategoryType.Income
        : transactionCategoryData.type === TransactionCategoryType.Expense,
  );

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>,
  ) => {
    addNewTransactionMutation.mutate(
      {
        name: values.name,
        count: isIncome ? Number(values.count) : Number(-values.count),
        categoryId: +values.category,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['finances'] });
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
            <TextInput label="Nazwa transakcji" name="name" id="name" />
            <NumberInput label="Kwota transakcji" name="count" id="count" />
            <SelectInput
              label="Kategoria"
              name="category"
              id="category"
              options={transactionCategories}
            />
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

export default AddNewTransactionForm;
