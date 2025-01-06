import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editNote, getNote } from '../../../Api/Notes';
import { Form, Formik } from 'formik';
import FormikTextarea from '../../../Components/FormikInputs/FormikTextArea';

interface INote {
  paramId: number;
}

const Note: React.FC<INote> = ({ paramId }) => {
  const { data: note, isLoading } = useQuery(`note-${paramId}`, () =>
    getNote(paramId),
  );

  const queryClient = useQueryClient();
  const updateNoteMutation = useMutation(editNote);

  const initialValues = {
    title: note?.title ?? '',
    content: note?.content ?? '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    updateNoteMutation.mutate(
      {
        id: paramId,
        body: {
          title: note!.title,
          content: values.content,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['notes'] });
          queryClient.invalidateQueries({ queryKey: [`note-${paramId}`] });
        },
      },
    );
  };

  if (isLoading) return <p>Ładowanie...</p>;

  return (
    <div className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{note?.title}</h2>
      </div>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values }) => {
            return (
              <>
                <Form className="h-full flex flex-col justify-between">
                  <div>
                    <FormikTextarea
                      label="Treść notatki:"
                      name="content"
                      id="content"
                      rows={10}
                    />
                  </div>
                </Form>
                <button
                  onClick={() => handleSubmit(values)}
                  type="submit"
                  className="px-4 py-2 rounded-lg focus:outline-none ml-2 bg-blue-600 text-white hover:bg-blue-700"
                >
                  Zapisz
                </button>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Note;
