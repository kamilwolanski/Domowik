import * as Yup from 'yup';

const validationSchema = () => {
    return Yup.object({
        title: Yup.string().required('Pole jest wymagane'),
    });
};

export default validationSchema;
