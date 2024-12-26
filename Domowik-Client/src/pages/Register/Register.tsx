import { Form, Formik, FormikHelpers } from 'formik';
import { useMutation } from 'react-query';
import EmailInput from '../../Components/FormikInputs/FormikEmailInput';
import PasswordInput from '../../Components/FormikInputs/FormikPasswordInput';
import TextInput from '../../Components/FormikInputs/FormikTextInput';
import DateInput from '../../Components/FormikInputs/FormikDateInput';
import validationSchema from './validationSchema';
import { register } from '../../Api';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  };

  const fromInvitationPathname = location.state?.from?.pathname;

  const registerMutation = useMutation(register, {
    onSuccess: ({ data: token }) => {
      if (token) {
        localStorage.setItem('token', token);
        navigate(fromInvitationPathname ? fromInvitationPathname : '/');
      }
    },
  });

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>,
  ) => {
    registerMutation.mutate(
      {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
      },
      {
        onError: (err) => {
          err.response.data?.Email &&
            formikHelpers.setFieldError('email', err.response.data?.Email[0]);
          err.response.data?.Password &&
            formikHelpers.setFieldError(
              'password',
              err.response.data?.Password[0],
            );
        },
      },
    );
  };

  return (
    <div className="register-page px-4 py-8">
      <h1 className="text-center text-2xl font-semibold">Załóż konto</h1>
      <div className="mt-8 max-w-3xl mx-auto">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <EmailInput label="Adres email" id="email" name="email" />
                  <PasswordInput label="Hasło" id="password" name="password" />
                  <PasswordInput
                    label="Powtórz hasło"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                </div>
                <div>
                  <TextInput label="Imię" id="firstName" name="firstName" />
                  <TextInput label="Nazwisko" id="lastName" name="lastName" />
                  <DateInput
                    label="Data urodzenia"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    min="1900-01-01"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                >
                  Załóż konto
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Masz już konto? Zaloguj się
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
