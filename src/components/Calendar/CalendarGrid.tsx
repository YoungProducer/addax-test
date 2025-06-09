import { Grid, DayHeader } from './calendarStyles';
import { CalendarDayCell } from './CalendarDayCell';
import type { Holiday } from '../../services/holidays';
import { isDateToday } from './dates';

interface CalendarGridProps {
  daysMatrix: { date: Date; isOutOfMonth: boolean; day: number }[][];
  weekDays: string[];
  holidays: Holiday[];
  popoverDay: Date | null;
  onOpenPopover: (date: Date) => void;
  onClosePopover: () => void;
}

export const CalendarGrid = ({
  daysMatrix,
  weekDays,
  holidays,
  popoverDay,
  onOpenPopover,
  onClosePopover,
}: CalendarGridProps) => {
  const getHolidaysForDate = (date: Date) =>
    holidays.filter(h => new Date(h.date).toDateString() === date.toDateString());

  return (
    <Grid>
      {weekDays.map(day => (
        <DayHeader key={day}>{day}</DayHeader>
      ))}
      {daysMatrix.flat().map(({ date, isOutOfMonth, day }) => {
        const dayHolidays = getHolidaysForDate(date);
        const isToday = isDateToday(date);
        return (
          <CalendarDayCell
            key={+date}
            date={date}
            isToday={isToday}
            isOutOfMonth={isOutOfMonth}
            holidays={dayHolidays}
            showPopover={popoverDay?.toDateString() === date.toDateString()}
            onOpenPopover={() => onOpenPopover(date)}
            onClosePopover={onClosePopover}
            day={day}
          />
        );
      })}
    </Grid>
  );
};
