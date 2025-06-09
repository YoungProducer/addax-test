import { Popover } from 'react-tiny-popover';
import {
  DayCell,
  DayHeaderRow,
  DayNumber,
  HolidayList,
  HolidayName,
  MoreBadge,
  PopoverContent,
  PopoverTitle,
  HolidayContainer,
} from './calendarStyles';
import type { Holiday } from '../../services/holidays';

interface CalendarDayCellProps {
  date: Date;
  isToday: boolean;
  isOutOfMonth: boolean;
  holidays: Holiday[];
  showPopover: boolean;
  onOpenPopover: () => void;
  onClosePopover: () => void;
  day: number;
}

export const CalendarDayCell = ({
  date,
  isToday,
  isOutOfMonth,
  holidays,
  showPopover,
  onOpenPopover,
  onClosePopover,
  day,
}: CalendarDayCellProps) => {
  const showHoliday = holidays[0];
  const moreCount = holidays.length > 1 ? holidays.length - 1 : 0;

  return (
    <DayCell isToday={isToday} isOutOfMonth={isOutOfMonth}>
      <DayHeaderRow>
        <DayNumber isToday={isToday} isOutOfMonth={isOutOfMonth}>
          {day}
        </DayNumber>
        <HolidayList>
          <Popover
            isOpen={showPopover}
            positions={['bottom', 'top']}
            padding={8}
            onClickOutside={onClosePopover}
            content={
              <PopoverContent>
                <PopoverTitle>Holidays for {date.toLocaleDateString()}</PopoverTitle>
                {holidays.map(holiday => (
                  <HolidayName
                    key={holiday.name}
                    title={holiday.localName}
                    style={{ marginBottom: 8, cursor: 'default' }}
                  >
                    {holiday.localName}
                  </HolidayName>
                ))}
              </PopoverContent>
            }
            align="start"
          >
            <HolidayContainer>
              {showHoliday && (
                <HolidayName title={showHoliday.localName} onClick={onOpenPopover}>
                  {showHoliday.localName}
                </HolidayName>
              )}
              {moreCount > 0 && <MoreBadge onClick={onOpenPopover}>+{moreCount}</MoreBadge>}
            </HolidayContainer>
          </Popover>
        </HolidayList>
      </DayHeaderRow>
    </DayCell>
  );
};
