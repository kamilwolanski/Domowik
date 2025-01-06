import { Formik, Form, FormikHelpers } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import TextInput from '../../../Components/FormikInputs/FormikTextInput';
import { createNote } from '../../../Api/Notes';
import validationSchema from './validationSchema';

interface IAddNewNotetForm {
    handleCancel: () => void;
}

const AddNewNotetForm: React.FC<IAddNewNotetForm> = ({
    handleCancel,
}) => {
    const initialValues = {
        title: '',
        content: '',
    };

    const queryClient = useQueryClient();
    const createNewNotetMutation = useMutation(createNote);

    const handleSubmit = (
        values: typeof initialValues,
        formikHelpers: FormikHelpers<typeof initialValues>,
    ) => {
        createNewNotetMutation.mutate(
            {
                title: values.title,
                content: values.content
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['notes'] });
                    formikHelpers.resetForm();
                    handleCancel();
                },
            },
        );
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid }) => {
                return (
                    <Form>
                        <TextInput label="Tytuł notatki" name="title" id="title" />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleCancel}
                                type="button"
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none"
                            >
                                Anuluj
                            </button>
                            <button
                                type="submit"
                                disabled={!isValid}
                                className={`px-4 py-2 rounded-lg focus:outline-none ml-2 ${isValid
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                Dodaj
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddNewNotetForm;
