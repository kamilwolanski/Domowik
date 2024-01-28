import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../../Components/FormikInputs/FormikTextInput';

import { Button } from 'reactstrap';
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
      {
        email: values.email,
      },
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

export default AddFamilyMemberForm;
