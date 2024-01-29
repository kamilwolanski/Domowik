import * as Yup from 'yup';

const validationSchema = () => {
  return Yup.object({
    name: Yup.string().required('Pole jest wymagane'),
    count: Yup.number()
      .required('Pole jest wymagane')
      .max(100000, 'Maksymalna kwota transakcji to 100 000 ')
      .min(1, 'Wartość traksakcji musi być większa lub równa 1'),
  });
};

export default validationSchema;
