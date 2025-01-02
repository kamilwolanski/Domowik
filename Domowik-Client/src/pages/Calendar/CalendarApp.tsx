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
import { Col, Row } from 'antd';
import AddCalendarEvent from './AddCalendarEvent';

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

 const { data: calendarEvents, isLoading } = useQuery(
    `calendar-events`,
      getCalendarEvents
  );
  
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
    <div className="h-full relative">
      <Row style={{ height: '100vh'}}>
        <Col span={8} offset={8}>
          <div className="px-4">
            <div className=" mx-auto">
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Kalendarz</h1>
                  <AddCalendarEvent />
              </div>
            </div>
          </div>
        </Col>
        <Col span={16} offset={4} style={{ height: '80%', overflowY: 'auto' }}>
          <ScheduleXCalendar calendarApp={calendar} />
        </Col>
      </Row>
    </div>
  );
}

export default CalendarApp;
