import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CalendarDays } from 'lucide-react';
import {
  ControlsBar,
  NavGroup,
  NavButton,
  MonthTitle,
  ToggleGroup,
  ToggleButton,
} from './calendarStyles';
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
    <ToggleGroup>
      <ToggleButton selected title="Month view" aria-label="Month view">
        <CalendarIcon size={20} color="#444" /> Month
      </ToggleButton>
      <ToggleButton title="Week view" aria-label="Week view">
        <CalendarDays size={20} color="#444" /> Week
      </ToggleButton>
    </ToggleGroup>
  </ControlsBar>
);
