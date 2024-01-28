import { Form, Formik, FormikHelpers } from 'formik';
import { Container, Row, Col } from 'reactstrap';
import validationSchema from './validationSchema';
import EmailInput from '../../Components/FormikInputs/FormikEmailInput';
import PasswordInput from '../../Components/FormikInputs/FormikPasswordInput';
import { useMutation } from 'react-query';
import { login } from '../../Api/api';
import { Button } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

  const loginMutation = useMutation(login);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<{ email: string; password: string }>,
  ) => {
    loginMutation.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: ({ data: token }) => {
          if (token) {
            localStorage.setItem('token', token);
          }
        },

        // @ts-expect-error
        onError: ({ response }) => {
          console.log('status', response.status);
          if (response.status === 400) {
            console.log('error', response.data);
            const errMsg = response.data;
            formikHelpers.setFieldError('email', errMsg);
          }
        },
      },
    );
  };
  return (
    <Container className="login-page">
      <h1 className="text-center">Zaloguj się</h1>
      <Row>
        <Col xs="12" md={{ size: 6, offset: 3 }}>
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
                  <div className="text-center">
                    <Button
                      size="lg"
                      type="submit"
                      disabled={!isValid}
                      color="primary"
                    >
                      Zaloguj się
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div className="text-center mt-3">
            <Link to="/auth/register">Załóż darmowe konto</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
