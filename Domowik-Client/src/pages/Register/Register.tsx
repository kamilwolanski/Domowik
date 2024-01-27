import { Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import EmailInput from '../../Components/FormikInputs/FormikEmailInput';
import PasswordInput from '../../Components/FormikInputs/FormikPasswordInput';
import { Button } from 'reactstrap';
import validationSchema from './validationSchema';
import { register } from '../../Api/api';

const Register = () => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const registerMutation = useMutation(register, {
    onSuccess: ({ data }) => {
      console.log('data', data);
    },
  });

  const handleSubmit = (values: typeof initialValues) => {
    registerMutation.mutate({
      email: values.email,
      password: values.password,
    });
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
            <EmailInput label="Adres email" id="email" name="email" />
            <PasswordInput label="Hasło" id="password" name="password" />
            <Button type="submit" disabled={!isValid}>
              Załóż konto
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Register;
