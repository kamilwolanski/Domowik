export function formatSchedulerDate(inputDate: Date): string {
  const date = new Date(inputDate);

  // Formatowanie roku, miesiąca, dnia, godziny i minut
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Łączenie w pożądany format
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export const toIntegers = (dateTimeSpecification: string) => {
  const hours = dateTimeSpecification.slice(11, 13),
    minutes = dateTimeSpecification.slice(14, 16);
  return {
    year: Number(dateTimeSpecification.slice(0, 4)),
    month: Number(dateTimeSpecification.slice(5, 7)) - 1,
    date: Number(dateTimeSpecification.slice(8, 10)),
    hours: hours !== '' ? Number(hours) : undefined,
    minutes: minutes !== '' ? Number(minutes) : undefined,
  };
};

export const dateFn = (dateTimeString: string, locale: string) => {
  const { year, month, date } = toIntegers(dateTimeString);
  return new Date(year, month, date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
const timeFn = (dateTimeString: string, locale: string) => {
  const { year, month, date, hours, minutes } = toIntegers(dateTimeString);
  return new Date(year, month, date, hours, minutes).toLocaleTimeString(
    locale,
    {
      hour: 'numeric',
      minute: 'numeric',
    },
  );
};
export const getTimeStamp = (
  // @ts-ignore
  calendarEvent, // to facilitate testing. In reality, we will always have a full CalendarEventInternal
  locale: string,
  delimiter = '\u2013',
) => {
  const eventTime = { start: calendarEvent.start, end: calendarEvent.end };
  if (calendarEvent._isSingleDayFullDay) {
    return dateFn(eventTime.start, locale);
  }
  if (calendarEvent._isMultiDayFullDay) {
    return `${dateFn(eventTime.start, locale)} ${delimiter} ${dateFn(eventTime.end, locale)}`;
  }
  if (calendarEvent._isSingleDayTimed && eventTime.start !== eventTime.end) {
    return `${dateFn(eventTime.start, locale)} <span aria-hidden="true">⋅</span> ${timeFn(eventTime.start, locale)} ${delimiter} ${timeFn(eventTime.end, locale)}`;
  }
  if (
    calendarEvent._isSingleDayTimed &&
    calendarEvent.start === calendarEvent.end
  ) {
    return `${dateFn(eventTime.start, locale)}, ${timeFn(eventTime.start, locale)}`;
  }
  return `${dateFn(eventTime.start, locale)}, ${timeFn(eventTime.start, locale)} ${delimiter} ${dateFn(eventTime.end, locale)}, ${timeFn(eventTime.end, locale)}`;
};
