import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../../Components/FormikInputs/FormikTextInput';
import { useMutation, useQueryClient } from 'react-query';
import { createFamily } from '../../Api/Family';

interface ICreateFamilyForm {
  handleCancel: () => void;
}

const CreateFamilyForm: React.FC<ICreateFamilyForm> = ({ handleCancel }) => {
  const createFamilyMutation = useMutation(createFamily);
  const queryClient = useQueryClient();

  const initialValues = {
    name: '',
  };

  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<{ name: string }>,
  ) => {
    createFamilyMutation.mutate(
      {
        name: values.name,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['family'] });
          queryClient.invalidateQueries({ queryKey: ['user'] });
          formikHelpers.resetForm();
          handleCancel();
        },

        onError: (err) => {
          console.warn('err', err);
        },
      },
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isValid }) => {
        return (
          <Form className="space-y-6">
            <TextInput
              label="Podaj nazwę swojej rodziny"
              name="name"
              id="name"
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-sm bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Anuluj
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className={`px-6 py-2 text-sm text-white rounded-md ${isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Utwórz
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateFamilyForm;
