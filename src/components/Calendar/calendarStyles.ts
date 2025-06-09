import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fafbfc;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 1.2rem 2rem;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

export const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const NavButton = styled.button`
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

export const MonthTitle = styled.h2`
  color: #222;
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0;
  letter-spacing: 1px;
  text-align: center;
  flex: 1;
`;

export const ToggleGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ToggleButton = styled.button<{ selected?: boolean }>`
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

export const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 40px repeat(6, 1fr);
  gap: 1px;
  background: #e0e0e0;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
`;

export const DayHeader = styled.div`
  background: #f4f5f7;
  color: #888;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
`;

export const DayCell = styled.div<{ isToday?: boolean; isOutOfMonth?: boolean }>`
  background: #fff;
  min-height: 90px;
  box-sizing: border-box;
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
`;

export const DayHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  min-width: 0;
  width: 100%;
  overflow: hidden;
`;

export const DayNumber = styled.div<{ isToday?: boolean; isOutOfMonth?: boolean }>`
  font-size: 1rem;
  font-weight: ${({ isToday }) => (isToday ? 700 : 500)};
  color: ${({ isToday, isOutOfMonth }) => (isToday ? '#ff9800' : isOutOfMonth ? '#bbb' : '#888')};
  flex-shrink: 0;
`;

export const HolidayList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.2rem;
  flex: 1;
  min-width: 0;
  width: 100%;
  overflow: hidden;
`;

export const HolidayContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 4px;
`;

export const HolidayName = styled.div`
  font-size: 0.8rem;
  color: #1976d2;
  font-weight: 500;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  background: #e3f2fd;
  border: 1px solid #90caf9;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MoreBadge = styled.div`
  font-size: 0.8rem;
  color: #1976d2;
  background: #e3f2fd;
  border-radius: 3px;
  padding: 0.1rem 0.3rem;
  margin-left: 0.2rem;
  cursor: pointer;
  user-select: none;
  border: 1px solid #90caf9;
  font-weight: 500;
  box-sizing: border-box;
`;

export const PopoverContent = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
  padding: 1rem 1.2rem;
  min-width: 220px;
  max-width: 320px;
  max-height: 60vh;
  overflow-y: auto;
  z-index: 1000;
`;

export const PopoverTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  color: #222;
`;
