import { Formik, Form, FormikHelpers } from 'formik';
import dayjs from 'dayjs';
import { Modal, Button, DatePicker, Select } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import { FamilyMember } from '../../Family/types';
import TextInput from '../../../Components/FormikInputs/FormikTextInput';
import TextArea from '../../../Components/FormikInputs/FormikTextArea';
import validationSchema from './validationSchema';
import { addEvent } from '../../../Api/CalendarEvents';
import useNotification from '../../../Components/Notification/useNotification';


type AddFormInitialValues = {
  name: string;
  description: string;
  startDateTime: dayjs.Dayjs | null;
  endDateTime: dayjs.Dayjs | null;
  participantIds: number[];
};
interface IModalAddEvent {
  familyMembers: FamilyMember[];
}
const ModalAddEvent: React.FC<IModalAddEvent> = ({ familyMembers }) => {
  const limitedFamilyMembers = familyMembers.slice(0, 5); // Ogranicz do pierwszych 5 członków

  const options = limitedFamilyMembers.map((member) => {
    return {
      label: `${member.firstName} ${member.lastName}`,
      value: member.id,
    };
  });

  const { openNotificationError } = useNotification();
  const [isVisible, setIsVisible] = useState(false);
  const queryClient = useQueryClient();
  const addEventMutation = useMutation(addEvent);

  const initialValues: AddFormInitialValues = {
    name: '',
    description: '',
    startDateTime: null,
    endDateTime: null,
    participantIds: [],
  };

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    const formattedValues = {
      ...values,
      startDateTime: values.startDateTime
        ? values.startDateTime.utc(true).toISOString()
        : '',
      endDateTime: values.endDateTime
        ? values.endDateTime.utc(true).toISOString()
        : '',
    };
    addEventMutation.mutate(formattedValues, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
        resetForm();
        handleCloseModal();
      },

      onError: () => {
        openNotificationError();
      },
    });
  };

  return (
    <>
      <button
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={handleOpenModal}
      >
        <IoAddCircleSharp size={30} />
        <span className="ml-2">Dodaj nowe wydarzenie</span>
      </button>

      <Modal
        title="Dodaj wydarzenie"
        open={isVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            isSubmitting,
            values,
            setFieldValue,
            errors,
            touched,
            isValid,
          }) => {
            return (
              <Form>
                <TextInput name="name" label="Nazwa wydarzenia" id="name" />
                <TextArea name="description" label="Opis" id="description" />

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Data rozpoczęcia
                  </label>
                  <DatePicker
                    className="w-full focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5"
                    value={values.startDateTime ? values.startDateTime : null}
                    onChange={(date) => setFieldValue('startDateTime', date)}
                    format="YYYY-MM-DD HH:mm"
                    showTime
                  />
                  {touched.startDateTime && errors.startDateTime && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.startDateTime}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Data zakończenia
                  </label>
                  <DatePicker
                    className="w-full !focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg !focus:ring-green-500 !focus:border-blue-500 block w-full p-2.5"
                    value={values.endDateTime ? values.endDateTime : null}
                    onChange={(date) => setFieldValue('endDateTime', date)}
                    format="YYYY-MM-DD HH:mm"
                    showTime
                  />
                  {touched.endDateTime && errors.endDateTime && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.endDateTime}
                    </p>
                  )}
                </div>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Uczestnicy
                  </label>
                  <Select
                    mode="multiple"
                    value={values.participantIds}
                    className="w-full focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block"
                    onChange={(value) => setFieldValue('participantIds', value)}
                    placeholder="Wybierz uczestników"
                    options={options}
                    dropdownStyle={{ maxHeight: 300, overflowY: 'auto' }}  // Dodaj to
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
                    disabled={isSubmitting || !isValid}
                    className="ml-2"
                  >
                    Dodaj
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalAddEvent;
