import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';

import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getCalendarEvents } from '../../Api/CalendarEvents';

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

 const { data: calendarEvents, isLoading } = useQuery(
    `calendar-events`,
      getCalendarEvents
  );
  console.log(calendarEvents)
  console.log(isLoading)
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: '1',
        title: 'urodziny',
        start: '2024-12-19 08:00',
        end: '2024-12-19 10:00',
      },
    ],
    plugins: [
      eventsService,
      createEventModalPlugin(),
      createDragAndDropPlugin(),
    ],
    locale: 'pl-PL',
  });
  

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
