import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background.default};
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
  background: ${({ theme }) => theme.colors.background.paper};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const NavButton = styled.button`
  background: ${({ theme }) => theme.colors.neutral[100]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 1.4rem;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[200]};
  }
`;

export const MonthTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
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
  background: ${({ theme, selected }) => (selected ? theme.colors.neutral[100] : 'transparent')};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 0.4rem 1.2rem;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: ${({ theme, selected }) => (selected ? theme.shadows.sm : 'none')};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[200]};
  }
`;

export const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 40px repeat(6, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.border.light};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

export const DayHeader = styled.div`
  background: ${({ theme }) => theme.colors.neutral[100]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const DayCell = styled.div<{ isToday?: boolean; isOutOfMonth?: boolean }>`
  background: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  color: ${({ theme, isOutOfMonth }) =>
    isOutOfMonth ? theme.colors.text.disabled : theme.colors.text.primary};
  position: relative;
  min-height: 90px;
  padding: 0.7rem 0.5rem 0.5rem 0.7rem;
  font-size: 1rem;
  border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  opacity: ${({ isOutOfMonth }) => (isOutOfMonth ? 0.6 : 1)};
  font-weight: ${({ theme, isToday }) =>
    isToday ? theme.typography.fontWeight.bold : theme.typography.fontWeight.regular};
  border-radius: 8px;
  z-index: ${({ isToday }) => (isToday ? 1 : 0)};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[50]};
    border-color: ${({ theme }) => theme.colors.primary.main};
    cursor: pointer;
  }
`;

export const AddButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  ${DayCell}:hover & {
    opacity: 1;
  }
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

export const DayNumber = styled.div<{ isToday: boolean; isOutOfMonth: boolean }>`
  font-size: 1rem;
  font-weight: ${({ theme, isToday }) =>
    isToday ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium};
  color: ${({ theme, isToday, isOutOfMonth }) =>
    isToday
      ? theme.colors.warning.main
      : isOutOfMonth
        ? theme.colors.text.disabled
        : theme.colors.text.secondary};
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
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.holiday.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.holiday.background};
  border: 1px solid ${({ theme }) => theme.colors.holiday.border};
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  cursor: default;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const MoreBadge = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.holiday.text};
  background: ${({ theme }) => theme.colors.holiday.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  margin-left: 0.2rem;
  cursor: pointer;
  user-select: none;
  border: 1px solid ${({ theme }) => theme.colors.holiday.border};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  box-sizing: border-box;
`;

export const PopoverContent = styled.div`
  background: ${({ theme }) => theme.colors.background.popover};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.popover};
  padding: 1rem 1.2rem;
  min-width: 220px;
  max-width: 320px;
  max-height: 60vh;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndex.popover};
`;

export const PopoverTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: 0.7rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  overflow-y: auto;
  max-height: calc(100% - 40px);
  padding-right: 4px;
  padding-top: 1px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.main};
    border-radius: 2px;
  }
`;
