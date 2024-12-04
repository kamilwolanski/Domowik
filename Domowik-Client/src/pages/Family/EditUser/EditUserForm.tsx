import { Form, Formik } from 'formik';
import TextInput from '../../../Components/FormikInputs/FormikTextInput';
import DateInput from '../../../Components/FormikInputs/FormikDateInput';

import validationSchema from './validationSchema';
import { useMutation, useQueryClient } from 'react-query';
import { editUser } from '../../../Api';
import formatDate from '../../../Helpers/formatDate';

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
  const formattedDate = formatDate(inputDate);

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

            <div className="flex justify-end space-x-2 mt-4">
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
                className={`px-4 py-2 rounded-lg focus:outline-none ${
                  isValid
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                Edytuj
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditUserForm;
