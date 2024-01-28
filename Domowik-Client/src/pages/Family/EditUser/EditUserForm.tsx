import { Form, Formik } from 'formik';
import TextInput from '../../../Components/FormikInputs/FormikTextInput';
import DateInput from '../../../Components/FormikInputs/FormikDateInput';

import validationSchema from './validationSchema';
import { Button } from 'reactstrap';
import { useMutation, useQueryClient } from 'react-query';
import { editUser } from '../../../Api/api';

interface IEditUserForm {
  handleCancel: () => void;
  user: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
}

const EditUserForm: React.FC<IEditUserForm> = ({ handleCancel, user }) => {
  const inputDate = new Date(user.dateOfBirth);
  const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: formattedDate,
  };
  const queryClient = useQueryClient();
  const editUserMutation = useMutation(editUser);

  const handleSubmit = (values: typeof initialValues) => {
    editUserMutation.mutate(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['family'] });
          handleCancel();
        },

        onError: (err) => {
          console.warn('err', err);
        },
      },
    );
  };
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => {
        return (
          <Form>
            <TextInput label="Imię" id="firstName" name="firstName" />
            <TextInput label="Nazwisko" id="lastName" name="lastName" />
            <DateInput
              label="Data urodzenia"
              id="dateOfBirth"
              name="dateOfBirth"
              min="1900-01-01"
              max={new Date().toISOString().split('T')[0]}
            />

            <div className="text-end">
              <Button onClick={handleCancel}>Anuluj</Button>
              <Button
                color="primary"
                className="ms-2"
                type="submit"
                disabled={!isValid}
              >
                Edytuj
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditUserForm;
