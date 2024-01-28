import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../../Components/FormikInputs/FormikTextInput';

import { Button } from 'reactstrap';

interface IAddFamilyMemberForm {
  handleCancel: () => void;
}
const AddFamilyMemberForm: React.FC<IAddFamilyMemberForm> = ({
  handleCancel,
}) => {
  const initialValues = {
    email: '',
  };

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<{ email: string }>,
  ) => {
    console.log('formikHelpers', formikHelpers);
    console.log('values', values)
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
