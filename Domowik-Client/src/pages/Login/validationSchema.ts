import * as Yup from 'yup';

const validationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email('Adres email jest niepoprawny')
      .required('Pole jest wymagane'),
    password: Yup.string().required('Pole jest wymagane'),
  });
};

export default validationSchema;
