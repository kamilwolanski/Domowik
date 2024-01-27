import { Form, Formik } from 'formik';
import validationSchema from './validationSchema';
import EmailInput from '../../Components/FormikInputs/FormikEmailInput';
import PasswordInput from '../../Components/FormikInputs/FormikPasswordInput';
import { useMutation } from 'react-query';
import { login } from '../../Api/api';
import { Button } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let redirectToPathAfterSuccess = location.state?.from?.pathname || '/';

  if (redirectToPathAfterSuccess === '/auth/logout') {
    redirectToPathAfterSuccess = '/';
  }
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectToPathAfterSuccess);
    }
  }, [isLoggedIn, navigate, redirectToPathAfterSuccess]);

  const loginMutation = useMutation(login, {
    onSuccess: ({ data: token }) => {
      if (token) {
        localStorage.setItem('token', token);
      }
    },
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    loginMutation.mutate({
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
              Zaloguj się
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
