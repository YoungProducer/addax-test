import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ControlsBar, MonthTitle, NavButton, NavGroup } from './calendarStyles';
import { monthNames } from './dates';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }: CalendarHeaderProps) => (
  <ControlsBar>
    <NavGroup>
      <NavButton onClick={onPrevMonth} title="Previous Month" aria-label="Previous Month">
        <ChevronLeft size={24} color="#444" />
      </NavButton>
      <NavButton onClick={onNextMonth} title="Next Month" aria-label="Next Month">
        <ChevronRight size={24} color="#444" />
      </NavButton>
    </NavGroup>
    <MonthTitle>
      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
    </MonthTitle>
  </ControlsBar>
);
