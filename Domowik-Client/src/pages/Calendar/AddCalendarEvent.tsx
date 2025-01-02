import { Formik, Form, FormikHelpers } from 'formik';
import { Modal, Button, DatePicker, Select, Input } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { IoAddCircleSharp } from 'react-icons/io5';
import { addEvent } from '../../Api';
import { useEffect, useState } from 'react';
import { getUser } from '../../Api';

const ModalAddEvent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<any>(null); // Typowanie danych użytkownika
  const [error, setError] = useState<string | null>(null); // Błąd ładowania użytkownika
  const queryClient = useQueryClient();
  const addEventMutation = useMutation(addEvent);

  // Funkcja do pobrania danych użytkownika
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(); // Wywołanie getUser
        setUser(response.data); // Przechowywanie danych użytkownika
      } catch (err) {
        setError('Wystąpił błąd podczas ładowania danych użytkownika');
        console.error(err);
      }
    };

    fetchUser(); // Wywołanie funkcji po załadowaniu komponentu
  }, []);

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<any>
  ) => {
    console.log('Form values before submit:', values);

    if (!values.name || !values.description || !values.startDateTime || !values.endDateTime) {
      alert('Wszystkie pola muszą być wypełnione!');
      setSubmitting(false);
      return;
    }

    if (!user) {
      alert('Nie znaleziono danych użytkownika');
      setSubmitting(false);
      return;
    }
    console.log('dane usera', user);
    try {
      // Jeśli dane użytkownika zostały pobrane, możemy je wykorzystać w zapytaniu
      const formattedValues = {
        ...values,
        startDateTime: values.startDateTime ? values.startDateTime.toISOString() : null,
        endDateTime: values.endDateTime ? values.endDateTime.toISOString() : null,
        familyId: user?.familyId, // Przypisanie FamilyId użytkownika do requesta
        organizerId: user?.id,
      };
      
      // Wysyłamy dane do serwera
      await addEventMutation.mutateAsync(formattedValues);
      resetForm();
      queryClient.invalidateQueries('events');
      handleCloseModal();
    } catch (error) {
      console.error('Błąd:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <div>Ładowanie danych użytkownika...</div>; // Możesz dodać spinner lub inne info o ładowaniu
  }

  return (
    <>
      <button
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={handleOpenModal}
      >
        <IoAddCircleSharp size={30} />
        <span className="ml-2">Dodaj nowy Event</span>
      </button>

      <Modal
        title="Dodaj wydarzenie"
        open={isVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Formik
          initialValues={{
            name: '',
            description: '',
            startDateTime: null,
            endDateTime: null,
            participants: [],
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue, handleChange, handleBlur }) => (
            <Form>
              <div className="mb-4">
                <label>Nazwa wydarzenia</label>
                <Input
                  name="name"
                  placeholder="Nazwa wydarzenia"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>

              <div className="mb-4">
                <label>Opis</label>
                <Input.TextArea
                  name="description"
                  placeholder="Opis wydarzenia"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>

              <div className="mb-4">
                <label>Data rozpoczęcia</label>
                <DatePicker
                  value={values.startDateTime ? values.startDateTime : null}
                  onChange={(date) => setFieldValue('startDateTime', date)}
                  format="YYYY-MM-DD HH:mm"
                  showTime
                />
              </div>

              <div className="mb-4">
                <label>Data zakończenia</label>
                <DatePicker
                  value={values.endDateTime ? values.endDateTime : null}
                  onChange={(date) => setFieldValue('endDateTime', date)}
                  format="YYYY-MM-DD HH:mm"
                  showTime
                />
              </div>

              <div className="mb-4">
                <label>Uczestnicy</label>
                <Select
                  mode="multiple"
                  value={values.participants}
                  onChange={(value) => setFieldValue('participants', value)}
                  placeholder="Wybierz uczestników"
                  options={[
                    { label: 'Jan Kowalski', value: 'jan' },
                    { label: 'Anna Nowak', value: 'anna' },
                    { label: 'Marek Wiśniewski', value: 'marek' },
                    { label: 'Ewa Nowakowska', value: 'ewa' },
                  ]}
                />
              </div>
              

              <div className="flex justify-end mt-4">
                <Button onClick={handleCloseModal} type="default">
                  Anuluj
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="ml-2"
                >
                  Dodaj
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalAddEvent;
