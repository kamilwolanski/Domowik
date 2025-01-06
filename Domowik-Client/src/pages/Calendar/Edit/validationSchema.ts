import * as Yup from 'yup';

const validationSchema = () => {
  return Yup.object({
    name: Yup.string().required('Pole jest wymagane'),
    description: Yup.string(),
    startDateTime: Yup.date()
      .nullable()
      .required('Pole jest wymagane')
      .typeError('Nieprawidłowy format daty'),
    endDateTime: Yup.date()
      .nullable()
      .required('Pole jest wymagane')
      .typeError('Nieprawidłowy format daty')
      .test(
        'is-greater',
        'Data zakończenia musi być późniejsza niż data rozpoczęcia',
        function (value) {
          const { startDateTime } = this.parent;
          return !startDateTime || !value || value > startDateTime;
        },
      ),
  });
};

export default validationSchema;
