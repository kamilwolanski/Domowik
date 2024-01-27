import { Formik, Form } from 'formik';
import TextInput from '../../Components/FormikInputs/FormikTextInput';

import { Button } from 'reactstrap';

interface ICreateFamilyForm {
  handleCancel: () => void;
}
const CreateFamilyForm: React.FC<ICreateFamilyForm> = ({ handleCancel }) => {
  const initialValues = {
    name: '',
  };

  const handleSubmit = () => {
    console.log('dupa');
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
