import { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { Plus } from 'lucide-react';
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
  TaskList,
} from './calendarStyles';
import { TaskCard } from './TaskCard';
import { TasksListModal } from './TasksListModal';
import { TaskInfoModal } from './TaskInfoModal';
import type { Holiday } from '../../services/holidays';
import type { Task } from '../../types/task';
import { getTasksForDate, deleteTask } from '../../services/tasks';

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
  const [tasks, setTasks] = useState<Task[]>(() => getTasksForDate(date));

  const showHoliday = holidays[0];
  const moreCount = holidays.length > 1 ? holidays.length - 1 : 0;

  const handleUpdateTask = (task: Task) => {
    const updatedTasks = tasks.map(t => (t.id === task.id ? task : t));
    localStorage.setItem('calendar_tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleCellClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setShowTasksListModal(true);
  };

  const handleAddTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem('calendar_tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setShowNewTaskModal(false);
  };

  return (
    <DayCell isToday={isToday} isOutOfMonth={isOutOfMonth} onClick={handleCellClick}>
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
                  <HolidayName key={holiday.name} title={holiday.localName}>
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
      <TaskList>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={handleUpdateTask}
          />
        ))}
      </TaskList>
      <AddButton onClick={() => setShowNewTaskModal(true)}>
        <Plus size={16} />
      </AddButton>
      {showTasksListModal && (
        <TasksListModal
          date={date}
          tasks={tasks}
          onClose={() => setShowTasksListModal(false)}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleUpdateTask}
        />
      )}
      {showNewTaskModal && (
        <TaskInfoModal
          task={{
            id: '',
            title: '',
            description: '',
            createdAt: new Date().toISOString(),
            date: date.toISOString(),
          }}
          onClose={() => setShowNewTaskModal(false)}
          onDelete={() => {}}
          onEdit={handleAddTask}
        />
      )}
    </DayCell>
  );
};
