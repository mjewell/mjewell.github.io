import { addDays } from 'date-fns';

export default function eachDay(startDate: Date, endDate: Date): Date[] {
  const days = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return days;
}
