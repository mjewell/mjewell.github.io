import { addDays, startOfDay } from 'date-fns';

export default function eachDay(startDate: Date, endDate: Date): Date[] {
  const days = [];

  let currentDate = startOfDay(startDate);
  while (currentDate <= endDate) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return days;
}
