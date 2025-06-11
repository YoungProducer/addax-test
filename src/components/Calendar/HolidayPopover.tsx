import { PopoverContent, PopoverTitle, HolidayName } from './calendarStyles';
import type { Holiday } from '../../services/holidays';

interface HolidayPopoverProps {
  date: Date;
  holidays: Holiday[];
}

export const HolidayPopover = ({ date, holidays }: HolidayPopoverProps) => (
  <PopoverContent>
    <PopoverTitle>Holidays for {date.toLocaleDateString()}</PopoverTitle>
    {holidays.map(holiday => (
      <HolidayName key={holiday.name} title={holiday.localName}>
        {holiday.localName}
      </HolidayName>
    ))}
  </PopoverContent>
);
