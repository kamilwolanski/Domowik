import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../../Components/FormikInputs/FormikTextInput';
import NumberInput from '../../Components/FormikInputs/FormikNumberInput';
import validationSchema from './validationSchema';

import { Button } from 'reactstrap';
import { useMutation, useQueryClient } from 'react-query';
import { addTransaction } from '../../Api/api';

interface IAddNewTransactionForm {
  handleCancel: () => void;
  isIncome: boolean;
}

const AddNewTransactionForm: React.FC<IAddNewTransactionForm> = ({
  handleCancel,
  isIncome,
}) => {
  const initialValues = {
    name: '',
    count: '',
  };

  const queryClient = useQueryClient();
  const addNewTransactionMutation = useMutation(addTransaction);

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>,
  ) => {
    addNewTransactionMutation.mutate(
      {
        name: values.name,
        count: isIncome ? Number(values.count) : Number(-values.count),
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
            <TextInput label="Podaj nazwę transakcji" name="name" id="name" />
            <NumberInput
              label="Podaj kwotę transakcji"
              name="count"
              id="count"
            />
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
