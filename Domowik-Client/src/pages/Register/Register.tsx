import { Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import { Container, Row, Col } from 'reactstrap';
import EmailInput from '../../Components/FormikInputs/FormikEmailInput';
import PasswordInput from '../../Components/FormikInputs/FormikPasswordInput';
import TextInput from '../../Components/FormikInputs/FormikTextInput';
import DateInput from '../../Components/FormikInputs/FormikDateInput';
import { Button } from 'reactstrap';
import validationSchema from './validationSchema';
import { register } from '../../Api/api';
import { Link } from 'react-router-dom';

const Register = () => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
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
      confirmPassword: values.confirmPassword,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
    });
  };

  return (
    <Container>
      <h1 className="text-center">Załóż konto</h1>
      <Row>
        <Col xs="12" md={{ size: 10, offset: 1 }}>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => {
              return (
                <Form>
                  <Row>
                    <Col>
                      <EmailInput label="Adres email" id="email" name="email" />
                      <PasswordInput
                        label="Hasło"
                        id="password"
                        name="password"
                      />
                      <PasswordInput
                        label="Powtórz hasło"
                        id="password"
                        name="confirmPassword"
                      />
                    </Col>
                    <Col>
                      <TextInput label="Imię" id="firstName" name="firstName" />
                      <TextInput
                        label="Nazwisko"
                        id="lastName"
                        name="lastName"
                      />
                      <DateInput
                        label="Data urodzenia"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        min="1900-01-01"
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </Col>
                  </Row>

                  <div className="text-center mt-3">
                    <Button
                      size="lg"
                      type="submit"
                      disabled={!isValid}
                      color="primary"
                    >
                      Załóż konto
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div className="text-center">
            <Link to="/auth/login">Masz już konto? Zaloguj się</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
