import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../../Components/FormikInputs/FormikTextInput';

import { useMutation, useQueryClient } from 'react-query';
import { addUser } from '../../Api/api';

interface IAddFamilyMemberForm {
  handleCancel: () => void;
}

const AddFamilyMemberForm: React.FC<IAddFamilyMemberForm> = ({
  handleCancel,
}) => {
  const initialValues = {
    email: '',
  };

  const queryClient = useQueryClient();
  const addFamilyMemberMutation = useMutation(addUser);

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<{ email: string }>,
  ) => {
    addFamilyMemberMutation.mutate(
      { email: values.email },
      {
        onSuccess: () => {
          formikHelpers.resetForm();
          queryClient.invalidateQueries({ queryKey: ['family'] });
          handleCancel();
        },
        // @ts-expect-error
        onError: (err: { response: { data: string } }) => {
          formikHelpers.setFieldError('email', err.response.data);
        },
      },
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isValid }) => {
        return (
          <Form>
            <TextInput
              label="Podaj email użytkownika"
              name="email"
              id="email"
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

export default AddFamilyMemberForm;
