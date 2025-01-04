export type Participant = {
  id: number;
  firstName: string;
  lastName: string;
};

export type CalendarEventData = {
  id: number;
  name: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  organizer: {
    firstName: string;
    id: number;
    lastName: string;
  };
  familyId: number;
  participants: Participant[];
};
