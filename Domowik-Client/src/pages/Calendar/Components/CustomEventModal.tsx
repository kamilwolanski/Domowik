import { useState } from 'react';
import { CalendarEvent, externalEventToInternal } from '@schedule-x/calendar';
import { getTimeStamp } from '../Helpers/formatSchedulerDate';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteEvent } from '../../../Api/CalendarEvents';
import useNotification from '../../../Components/Notification/useNotification';
import EventDrawer from '../Edit/EventDrawer';
import { FamilyMember } from '../../../Api/Family/types';
import {
  CalendarEventData,
  Participant,
} from '../../../Api/CalendarEvents/types';
import { getUser } from '../../../Api';

export interface CalendarEventWithParticipants {
  id: number;
  start: string;
  end: string;
  title?: string;
  people?: Participant[];
  location?: string;
  description?: string;
  calendarId?: string;
  _customContent?: {
    timeGrid?: string;
    dateGrid?: string;
    monthGrid?: string;
    monthAgenda?: string;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ICustomEventModal {
  calendarEvent: CalendarEvent;
  locale: string;
  eventModal: {
    close: () => void;
  };
  familyMembers: FamilyMember[];
  calendarEvents: CalendarEventData[];
}

const CustomEventModal: React.FC<ICustomEventModal> = ({
  calendarEvent,
  locale,
  eventModal,
  familyMembers,
  calendarEvents,
}) => {
  // @ts-ignore
  const internalCalendarEvent = externalEventToInternal(calendarEvent);
  const timeStampReactNode = getTimeStamp(internalCalendarEvent, locale);

  const queryClient = useQueryClient();
  const deleteEventMutation = useMutation(deleteEvent);
  const { openNotificationError } = useNotification();
  const { data: userData } = useQuery({
    queryKey: 'user',
    queryFn: getUser,
    useErrorBoundary: true,
  });

  const userDataRoleId = userData?.data.roleId;
  const [openDrawer, setDrawerOpen] = useState(false);

  const calendarEventData = calendarEvents.find(
    (e) => e.id == calendarEvent.id,
  );

  const calendarEventWithParticipant: CalendarEventWithParticipants = {
    ...calendarEvent,
    id: +calendarEvent.id,
    people: calendarEventData?.participants,
  };

  const handleDelete = () => {
    deleteEventMutation.mutate(+calendarEvent.id, {
      onSuccess: () => {
        eventModal.close();
        const randomGridDayEl: HTMLDivElement | null =
          document.querySelector('.sx__time-grid-day');
        if (randomGridDayEl) {
          randomGridDayEl.click();
        }
        queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      },
      onError: () => {
        openNotificationError();
      },
    });
  };

  const handleEdit = () => {
    showDrawer();
  };

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const canDisplay = () => {
    if (
      userDataRoleId === 3 ||
      calendarEventData?.organizer.id === userData?.data.id
    )
      return true;
    return false;
  };

  return (
    <>
      <div className={`sx__event-modal-default ${canDisplay() ? 'pt-3' : ''}`}>
        {canDisplay() && (
          <>
            <div className="flex justify-end">
              <div className="flex">
                <button
                  className="flex items-center p-2 rounded-full hover:bg-gray-200"
                  onClick={handleEdit}
                  type="button"
                >
                  <MdModeEdit size={20} color="#444746" />
                </button>
                <button
                  className="flex items-center p-2 rounded-full hover:bg-gray-200"
                  onClick={handleDelete}
                  type="button"
                >
                  <MdDeleteForever size={20} color="#444746" />
                </button>
              </div>
            </div>
            <hr className="mt-2 mb-3" />
          </>
        )}

        <div className="sx__has-icon sx__event-modal__title">
          <div className="sx__event-modal__color-icon sx__event-icon bg-violet-300"></div>
          {calendarEvent.title}
        </div>
        <div className="sx__has-icon sx__event-modal__time">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sx__event-icon"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M12 8V12L15 15"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#000"
                strokeWidth="2"
              ></circle>
            </g>
          </svg>
          <div
            dangerouslySetInnerHTML={{
              __html: timeStampReactNode,
            }}
          ></div>
        </div>
        {calendarEvent.people && calendarEvent.people?.length > 0 && (
          <div className="sx__has-icon sx__event-modal__people">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sx__event-icon"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7Z"
                  stroke="#000"
                  strokeWidth="2"
                ></path>
                <path
                  d="M5 19.5C5 15.9101 7.91015 13 11.5 13H12.5C16.0899 13 19 15.9101 19 19.5V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V19.5Z"
                  stroke="#000"
                  strokeWidth="2"
                ></path>
              </g>
            </svg>
            {calendarEvent.people?.join(', ')}
          </div>
        )}
        {calendarEvent.description && (
          <div className="sx__has-icon sx__event-modal__description">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sx__event-icon"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="3"
                  stroke="#000"
                  strokeWidth="2"
                ></rect>
                <path
                  d="M16 10L8 10"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M16 14L8 14"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
              </g>
            </svg>
            {calendarEvent.description}
          </div>
        )}
      </div>

      <EventDrawer
        calendarEventWithParticipant={calendarEventWithParticipant}
        closeDrawer={closeDrawer}
        openDrawer={openDrawer}
        familyMembers={familyMembers}
      />
    </>
  );
};

export default CustomEventModal;
