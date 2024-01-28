import * as Yup from 'yup';

const validationSchema = () => {
  return Yup.object({
    firstName: Yup.string().required('Pole jest wymagane'),
    lastName: Yup.string().required('Pole jest wymagane'),
    dateOfBirth: Yup.date().min(
      new Date(1900, 0, 1),
      'Podaj prawidłową datę urodzenia',
    ),
  });
};

export default validationSchema;
