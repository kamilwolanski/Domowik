import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../../Components/FormikInputs/FormikTextInput';

import { Button } from 'reactstrap';
import { useMutation } from 'react-query';
import { createFamily } from '../../Api/api';

interface ICreateFamilyForm {
  handleCancel: () => void;
}
const CreateFamilyForm: React.FC<ICreateFamilyForm> = ({ handleCancel }) => {
  const createFamilyMutation = useMutation(createFamily);

  const initialValues = {
    name: '',
  };

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<{ name: string }>,
  ) => {
    console.log('formikHelpers', formikHelpers);
    createFamilyMutation.mutate(
      {
        name: values.name,
      },
      {
        onSuccess: () => {
          handleCancel();
        },

        onError: (err) => {
          console.log('err', err);
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
              label="Podaj nazwę swojej rodziny"
              name="name"
              id="name"
            />
            <div className="text-end">
              <Button onClick={handleCancel}>Anuluj</Button>
              <Button
                color="primary"
                className="ms-2"
                type="submit"
                disabled={!isValid}
              >
                Utwórz
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateFamilyForm;
