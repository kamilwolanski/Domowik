import { Form, Formik, FormikHelpers } from 'formik';
import validationSchema from './validationSchema';
import EmailInput from '../../Components/FormikInputs/FormikEmailInput';
import PasswordInput from '../../Components/FormikInputs/FormikPasswordInput';
import { useMutation } from 'react-query';
import { login } from '../../Api';
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
          if (response.status === 400) {
            const errMsg = response.data;
            formikHelpers.setFieldError('email', errMsg);
          }
        },
      },
    );
  };

  return (
    <div className="login-page px-4 py-8">
      <h1 className="text-center text-2xl font-semibold">Zaloguj się</h1>
      <div className="mt-8 max-w-md mx-auto">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
            <Form>
              <div className="space-y-4">
                <EmailInput label="Adres email" id="email" name="email" />
                <PasswordInput label="Hasło" id="password" name="password" />
              </div>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-blue-300"
                >
                  Zaloguj się
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Załóż darmowe konto
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
