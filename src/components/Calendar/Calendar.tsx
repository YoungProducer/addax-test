import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CalendarDays } from 'lucide-react';
import { monthNames, weekDays, isDateToday, getDaysMatrix } from './dates';

const ICON_COLOR = '#444';
const ICON_SIZE = 24;

const CalendarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fafbfc;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 1.2rem 2rem;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavButton = styled.button`
  background: #f4f5f7;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1.4rem;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #444;
  transition:
    background 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  &:hover {
    background: #e0e0e0;
  }
`;

const MonthTitle = styled.h2`
  color: #222;
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0;
  letter-spacing: 1px;
  text-align: center;
  flex: 1;
`;

const ToggleGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ToggleButton = styled.button<{ selected?: boolean }>`
  background: ${({ selected }) => (selected ? '#f4f5f7' : 'transparent')};
  color: #444;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition:
    background 0.2s,
    color 0.2s;
  box-shadow: ${({ selected }) => (selected ? '0 1px 2px rgba(0,0,0,0.04)' : 'none')};
  &:hover {
    background: #e0e0e0;
  }
`;

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 40px repeat(6, 1fr);
  gap: 1px;
  background: #e0e0e0;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
`;

const DayHeader = styled.div`
  background: #f4f5f7;
  color: #888;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
`;

interface DayProps {
  isToday?: boolean;
  isOutOfMonth?: boolean;
}

const DayCell = styled.div<DayProps>`
  background: #fff;
  min-height: 90px;
  position: relative;
  padding: 0.7rem 0.5rem 0.5rem 0.7rem;
  font-size: 1rem;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  color: ${({ isOutOfMonth }) => (isOutOfMonth ? '#bbb' : '#222')};
  opacity: ${({ isOutOfMonth }) => (isOutOfMonth ? 0.6 : 1)};
  font-weight: ${({ isToday }) => (isToday ? 700 : 400)};
  box-shadow: ${({ isToday }) => (isToday ? 'inset 0 0 0 2px #ff9800' : 'none')};
  border-radius: ${({ isToday }) => (isToday ? '8px' : '0')};
  z-index: ${({ isToday }) => (isToday ? 1 : 0)};
  transition:
    box-shadow 0.2s,
    border-radius 0.2s;
  &:hover {
    background: #f4f5f7;
    cursor: pointer;
  }
`;

const DayNumber = styled.div<DayProps>`
  position: absolute;
  top: 0.5rem;
  left: 0.7rem;
  font-size: 1rem;
  font-weight: ${({ isToday }) => (isToday ? 700 : 500)};
  color: ${({ isToday, isOutOfMonth }) => (isToday ? '#ff9800' : isOutOfMonth ? '#bbb' : '#888')};
`;

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysMatrix = useMemo(() => getDaysMatrix(currentDate), [currentDate]);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <CalendarWrapper>
      <ControlsBar>
        <NavGroup>
          <NavButton onClick={prevMonth} title="Previous Month" aria-label="Previous Month">
            <ChevronLeft size={ICON_SIZE} color={ICON_COLOR} />
          </NavButton>
          <NavButton onClick={nextMonth} title="Next Month" aria-label="Next Month">
            <ChevronRight size={ICON_SIZE} color={ICON_COLOR} />
          </NavButton>
        </NavGroup>
        <MonthTitle>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </MonthTitle>
        <ToggleGroup>
          <ToggleButton selected title="Month view" aria-label="Month view">
            <CalendarIcon size={20} color={ICON_COLOR} /> Month
          </ToggleButton>
          <ToggleButton title="Week view" aria-label="Week view">
            <CalendarDays size={20} color={ICON_COLOR} /> Week
          </ToggleButton>
        </ToggleGroup>
      </ControlsBar>
      <Grid>
        {weekDays.map(day => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {daysMatrix.flat().map(({ date, isOutOfMonth, day }) => {
          const isToday = isDateToday(date);

          return (
            <DayCell key={+date} isToday={isToday} isOutOfMonth={isOutOfMonth}>
              <DayNumber isToday={isToday} isOutOfMonth={isOutOfMonth}>
                {day}
              </DayNumber>
            </DayCell>
          );
        })}
      </Grid>
    </CalendarWrapper>
  );
};
