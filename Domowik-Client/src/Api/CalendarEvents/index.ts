import api from '..';
import { CalendarEventData } from './types';

export const getCalendarEvents = async () => {
  const response = await api.get<CalendarEventData[]>('/calendar-events');

  return response.data;
};

export const addEvent = async (eventData: {
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  participantIds: number[];
}) => {
  const response = await api.post('/calendar-events/add', eventData);
  return response.data;
};

export const deleteEvent = async (id: number) => {
  const response = await api.delete(`/calendar-events/${id}`);

  return response;
};

export const updateEvent = async (variables: {
  id: number;
  body: {
    name: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    participantIds: number[];
  };
}) => {
  const response = await api.patch(
    `/calendar-events/${variables.id}`,
    variables.body,
  );

  return response.data;
};
