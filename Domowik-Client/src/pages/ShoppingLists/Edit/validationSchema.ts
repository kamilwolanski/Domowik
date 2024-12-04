import * as Yup from 'yup';

const validationSchema = () => {
  return Yup.object({
    name: Yup.string().required('Pole jest wymagane'),
  });
};

export default validationSchema;
