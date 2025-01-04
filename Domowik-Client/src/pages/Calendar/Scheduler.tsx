import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { formatSchedulerDate } from './Helpers/formatSchedulerDate';
import { CalendarEventData, Participant } from '../../Api/CalendarEvents/types';
import { useEffect } from 'react';
import CustomEventModal from './Components/CustomEventModal';
import { FamilyMember } from '../../Api/Family/types';

interface IScheduler {
  calendarEvents: CalendarEventData[];
  familyMembers: FamilyMember[];
}

const Scheduler: React.FC<IScheduler> = ({ calendarEvents, familyMembers }) => {
  const eventModal = createEventModalPlugin();
  const handlePeople = (participants: Participant[]) => {
    if (participants.length == 0) return;
    const people: string[] = participants.map(
      (p) => `${p.firstName} ${p.lastName}`,
    );

    return people;
  };

  const events = calendarEvents.map((e) => {
    return {
      id: e.id,
      title: e.name,
      description: e.description,
      start: formatSchedulerDate(e.startDateTime),
      end: formatSchedulerDate(e.endDateTime),
      people: handlePeople(e.participants),
    };
  });

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [eventModal],
    locale: 'pl-PL',
  });

  useEffect(() => {
    calendar.events.set(events);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarEvents]);

  return (
    <ScheduleXCalendar
      calendarApp={calendar}
      customComponents={{
        eventModal: (props) => (
          <CustomEventModal
            {...props}
            locale="pl-PL"
            eventModal={eventModal}
            familyMembers={familyMembers}
            calendarEvents={calendarEvents}
          />
        ),
      }}
    />
  );
};

export default Scheduler;
