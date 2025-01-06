import { Formik, Form } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TextInput from '../../../Components/FormikInputs/FormikTextInput';
import { Note } from '../../../Api/Notes/types';
import validationSchema from './validationSchema';
import { editNote, getNote } from '../../../Api/Notes';
import { Content } from 'antd/es/layout/layout';

interface IEditNoteForm {
    handleCancel: () => void;
    notetEl: Note;
}

const EditNoteForm: React.FC<IEditNoteForm> = ({
    handleCancel,
    notetEl,
}) => {
    const { data: note, isLoading } = useQuery(
        `note-${notetEl.id}`,
        () => getNote(notetEl.id),
    );
    const initialValues = {
        title: notetEl.title,
        content: notetEl.content,
    };

    const queryClient = useQueryClient();
    const updateNoteMutation = useMutation(editNote);

    const handleSubmit = (values: typeof initialValues) => {
        console.log('weszlo');
        updateNoteMutation.mutate(
            {
                id: notetEl.id,
                body: {
                    title: values.title,
                    content: note!.content
                },
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['notes'] });
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
            {({ isValid, values }) => {
                return (
                    <Form>
                        <TextInput label="" name="title" id="title" />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleCancel}
                                type="button"
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none"
                            >
                                Anuluj
                            </button>
                            <button
                                onClick={() => handleSubmit(values)}
                                type="submit"
                                disabled={!isValid}
                                className={`px-4 py-2 rounded-lg focus:outline-none ml-2 ${isValid
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                Zapisz
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default EditNoteForm;
