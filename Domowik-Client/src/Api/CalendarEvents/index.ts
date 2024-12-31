import api from "..";
import { CalendarEvent } from "./types";


export const getCalendarEvents = async () => {
    const response = await api.get<CalendarEvent[]>('/calendar-events');
  
    return response.data;
  };