import '@schedule-x/theme-default/dist/index.css';
import { useQuery } from 'react-query';
import { getCalendarEvents } from '../../Api/CalendarEvents';
import { Col, Row } from 'antd';
import AddCalendarEvent from './Add/AddCalendarEvent';
import { getUserFamily } from '../../Api/Family';
import { AxiosError } from 'axios';
import { Family } from '../../Api/Family/types';
import Scheduler from './Scheduler';

function CalendarApp() {
  const { data: calendarEvents, isLoading } = useQuery({
    queryKey: 'calendar-events',
    queryFn: getCalendarEvents,
    useErrorBoundary: true,
  });
  const { data: family, isLoading: isLoadingFamily } = useQuery<
    Family,
    AxiosError<string>
  >({
    queryKey: 'family',
    queryFn: getUserFamily,
    useErrorBoundary: true,
  });

  if (isLoading || isLoadingFamily) return <p>Loading...</p>;

  return (
    <div className="h-full relative">
      <Row style={{ height: '100vh' }}>
        <Col xs={{ span: 24 }} md={{ span: 8, offset: 8 }}>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Kalendarz</h2>
            {family?.members ? (
              <AddCalendarEvent familyMembers={family?.members} />
            ) : null}
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 16, offset: 4 }}
          style={{ height: '80%', overflowY: 'auto' }}
        >
          {calendarEvents && family?.members && (
            <Scheduler
              calendarEvents={calendarEvents}
              familyMembers={family?.members}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default CalendarApp;
