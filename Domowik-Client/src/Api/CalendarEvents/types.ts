export type CalendarEvent = {
    id: number;
    name: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    organizerId: number;
    familyId: number;
  };