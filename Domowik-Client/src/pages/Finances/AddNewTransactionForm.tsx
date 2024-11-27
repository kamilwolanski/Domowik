import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../../Components/FormikInputs/FormikTextInput';
import NumberInput from '../../Components/FormikInputs/FormikNumberInput';
import SelectInput from '../../components/FormikInputs/FormikSelectInput';
import validationSchema from './validationSchema';

import { Button } from 'reactstrap';
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
      {({ isValid, values }) => {
        console.log('values', values);
        return (
          <Form>
            <TextInput label="Nazwa transakcji" name="name" id="name" />
            <NumberInput label="Kwota transakcji" name="count" id="count" />
            <SelectInput
              label="Kategoria"
              name="category"
              id="category"
              options={transactionCategories}
            ></SelectInput>
            <div className="text-end">
              <Button onClick={handleCancel}>Anuluj</Button>
              <Button
                color="primary"
                className="ms-2"
                type="submit"
                disabled={!isValid}
              >
                Dodaj
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddNewTransactionForm;
