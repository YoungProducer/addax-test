import { useState, useRef } from 'react';
import { Popover } from 'react-tiny-popover';
import { Plus } from 'lucide-react';
import { useDrop } from 'react-dnd';
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
  AddButton,
} from './calendarStyles';
import { DroppableTaskList } from './DroppableTaskList';
import { TasksListModal } from './TasksListModal';
import { TaskInfoModal } from './TaskInfoModal';
import type { Holiday } from '../../services/holidays';
import type { Task } from '../../types/task';
import { useTasks } from '../../contexts/TasksContext';

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
  const [showTasksListModal, setShowTasksListModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);
  const { getTasksForDate, moveTask, deleteTask, reorderTasks } = useTasks();
  const tasks = getTasksForDate(date);

  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { type: string; index: number; id: string; task: Task }) => {
      // If the task is from a different date, move it to this date
      const taskDate = new Date(item.task.date);
      if (taskDate.toDateString() !== date.toDateString()) {
        moveTask(item.id, date);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  // Apply the drop ref to our cell ref
  drop(cellRef);

  const showHoliday = holidays[0];
  const moreCount = holidays.length > 1 ? holidays.length - 1 : 0;

  const handleCellClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setShowTasksListModal(true);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleReorderTasks = (dragIndex: number, hoverIndex: number) => {
    reorderTasks(date, dragIndex, hoverIndex);
  };

  return (
    <DayCell
      ref={cellRef}
      isToday={isToday}
      isOutOfMonth={isOutOfMonth}
      onClick={handleCellClick}
      data-is-over={isOver}
    >
      <DayHeaderRow>
        <DayNumber isToday={isToday} isOutOfMonth={isOutOfMonth}>
          {day}
        </DayNumber>
        <AddButton
          onClick={e => {
            e.stopPropagation();
            setShowNewTaskModal(true);
          }}
          title="Add task"
        >
          <Plus size={16} />
        </AddButton>
      </DayHeaderRow>
      {holidays.length > 0 && (
        <HolidayContainer>
          <HolidayList>
            <Popover
              isOpen={showPopover}
              positions={['top', 'bottom']}
              padding={8}
              onClickOutside={onClosePopover}
              content={
                <PopoverContent>
                  <PopoverTitle>Holidays</PopoverTitle>
                  {holidays.map(holiday => (
                    <HolidayName key={holiday.name}>{holiday.name}</HolidayName>
                  ))}
                </PopoverContent>
              }
            >
              <HolidayName onClick={onOpenPopover}>
                {showHoliday.name}
                {moreCount > 0 && <MoreBadge>+{moreCount}</MoreBadge>}
              </HolidayName>
            </Popover>
          </HolidayList>
        </HolidayContainer>
      )}
      <DroppableTaskList
        tasks={tasks}
        date={date}
        onDelete={handleDeleteTask}
        onReorder={handleReorderTasks}
      />
      <TasksListModal
        isOpen={showTasksListModal}
        date={date}
        onClose={() => setShowTasksListModal(false)}
      />
      {showNewTaskModal && (
        <TaskInfoModal
          task={{
            id: '',
            title: '',
            description: '',
            createdAt: new Date().toDateString(),
            date: date.toDateString(),
          }}
          onClose={() => setShowNewTaskModal(false)}
          currentDate={date}
        />
      )}
    </DayCell>
  );
};
