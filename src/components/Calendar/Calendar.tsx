import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarWrapper } from './calendarStyles';
import { weekDays, getDaysMatrix } from './dates';
import { getHolidays, getUserCountry } from '../../services/holidays';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [countryCode, setCountryCode] = useState<string>('US');
  const [popoverDay, setPopoverDay] = useState<Date | null>(null);

  useEffect(() => {
    setCountryCode(getUserCountry());
  }, []);

  const { data: holidays = [] } = useQuery({
    queryKey: ['holidays', currentDate.getFullYear(), countryCode],
    queryFn: () => getHolidays(currentDate.getFullYear(), countryCode),
    enabled: !!countryCode,
  });

  const daysMatrix = useMemo(() => getDaysMatrix(currentDate), [currentDate]);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <CalendarWrapper>
      <CalendarHeader currentDate={currentDate} onPrevMonth={prevMonth} onNextMonth={nextMonth} />
      <CalendarGrid
        daysMatrix={daysMatrix}
        weekDays={weekDays}
        holidays={holidays}
        popoverDay={popoverDay}
        onOpenPopover={setPopoverDay}
        onClosePopover={() => setPopoverDay(null)}
      />
    </CalendarWrapper>
  );
};
