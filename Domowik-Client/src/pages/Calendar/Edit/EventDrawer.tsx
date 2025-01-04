import { Drawer, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { Formik, Form } from 'formik';
import TextInput from '../../../Components/FormikInputs/FormikTextInput';
import TextArea from '../../../Components/FormikInputs/FormikTextArea';
import { FamilyMember } from '../../../Api/Family/types';
import validationSchema from './validationSchema';
import useNotification from '../../../Components/Notification/useNotification';
import { useMutation, useQueryClient } from 'react-query';
import { updateEvent } from '../../../Api/CalendarEvents';
import { CalendarEventWithParticipants } from '../Components/CustomEventModal';

interface IEventDrawer {
  closeDrawer: () => void;
  openDrawer: boolean;
  familyMembers: FamilyMember[];
  calendarEventWithParticipant: CalendarEventWithParticipants;
}

const EventDrawer: React.FC<IEventDrawer> = ({
  closeDrawer,
  openDrawer,
  familyMembers,
  calendarEventWithParticipant,
}) => {
  const initialValues = {
    name: calendarEventWithParticipant.title,
    description: calendarEventWithParticipant.description,
    startDateTime: dayjs(
      calendarEventWithParticipant.start,
      'YYYY-MM-DD HH:mm',
    ),
    endDateTime: dayjs(calendarEventWithParticipant.end, 'YYYY-MM-DD HH:mm'),
    participantIds: calendarEventWithParticipant.people
      ? calendarEventWithParticipant.people.map((e) => {
          return {
            label: `${e.firstName} ${e.lastName}`,
            value: e.id,
          };
        })
      : [],
  };

  const options = familyMembers.map((member) => {
    return {
      label: `${member.firstName} ${member.lastName}`,
      value: member.id,
    };
  });

  const { openNotificationError } = useNotification();
  const updateEventMutation = useMutation(updateEvent);
  const queryClient = useQueryClient();

  const handleSubmit = async (values: typeof initialValues) => {
    const formattedValues = {
      participantIds: values.participantIds
        ? values.participantIds.map((p) => p.value)
        : [],
      description: values.description ? values.description : '',
      name: values.name ? values.name : '',
      startDateTime: values.startDateTime
        ? values.startDateTime.utc(true).toISOString()
        : '',
      endDateTime: values.endDateTime
        ? values.endDateTime.utc(true).toISOString()
        : '',
    };

    updateEventMutation.mutate(
      {
        id: +calendarEventWithParticipant.id,
        body: formattedValues,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
          closeDrawer();
        },

        onError: () => {
          openNotificationError();
        },
      },
    );
  };
  return (
    <Drawer
      title={calendarEventWithParticipant.title}
      onClose={closeDrawer}
      open={openDrawer}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => {
          return (
            <>
              <Form className="h-full flex flex-col justify-between">
                <div>
                  <TextInput label="Nazwa wydarzenia" name="name" id="name" />
                  <TextArea name="description" label="Opis" id="description" />
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Data rozpoczęcia
                    </label>
                    <DatePicker
                      className="w-full focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5"
                      value={
                        values.startDateTime
                          ? values.startDateTime.locale('pl')
                          : null
                      }
                      onChange={(date) => setFieldValue('startDateTime', date)}
                      format="YYYY-MM-DD HH:mm"
                      showTime
                    />
                    {touched.startDateTime && errors.startDateTime && (
                      <p className="mt-2 text-sm text-red-600">
                        {String(errors.startDateTime)}
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
                        {String(errors.endDateTime)}
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
                      labelInValue
                      className="w-full focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block"
                      onChange={(value) => {
                        console.log('value', value);
                        setFieldValue(
                          'participantIds',
                          value.map((e) => {
                            return {
                              label: e.label,
                              value: e.value,
                            };
                          }),
                        );
                      }}
                      placeholder="Wybierz uczestników"
                      options={options}
                    />
                  </div>
                </div>

                <div className="pt-5 before:content-[''] before:block before:absolute before:left-0 before:h-px before:bg-neutral-300 before:transform before:-translate-y-6 before:w-full">
                  <button
                    className="bg-blue-600 w-full text-white text-lg font-bold py-2 px-10 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="submit"
                  >
                    <span className="ml-2">Zapisz</span>
                  </button>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </Drawer>
  );
};

export default EventDrawer;
