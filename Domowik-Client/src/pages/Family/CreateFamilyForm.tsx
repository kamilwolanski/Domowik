import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../../Components/FormikInputs/FormikTextInput';

import { Button } from 'reactstrap';
import { useMutation, useQueryClient } from 'react-query';
import { createFamily } from '../../Api/api';

interface ICreateFamilyForm {
  handleCancel: () => void;
}
const CreateFamilyForm: React.FC<ICreateFamilyForm> = ({ handleCancel }) => {
  const createFamilyMutation = useMutation(createFamily);
  const queryClient = useQueryClient();

  const initialValues = {
    name: '',
  };

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<{ name: string }>,
  ) => {

    createFamilyMutation.mutate(
      {
        name: values.name,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['family'] });
          formikHelpers.resetForm();
          handleCancel();
        },

        onError: (err) => {
          console.warn('err', err);
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
