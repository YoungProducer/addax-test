import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { useRef } from 'react';
import { DraggableTaskCard } from './DraggableTaskCard';
import type { Task } from '../../types/task';
import { useTasks } from '../../contexts/TasksContext';

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  overflow-y: auto;
  max-height: calc(100% - 40px);
  padding-right: 4px;
  padding-top: 1px;
  min-height: 20px;
  flex: 1;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border: 2px dashed transparent;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;
  }

  &[data-is-over='true']::before {
    border-color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) => theme.colors.primary.light + '10'};
  }

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

interface DroppableTaskListProps {
  tasks: Task[];
  date: Date;
  onDelete?: (taskId: string) => void;
  onReorder?: (dragIndex: number, hoverIndex: number) => void;
}

export const DroppableTaskList = ({ tasks, date, onDelete, onReorder }: DroppableTaskListProps) => {
  const { deleteTask } = useTasks();
  const handleDelete = onDelete || deleteTask;

  const containerRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  drop(containerRef);

  return (
    <TaskListContainer ref={containerRef} data-is-over={isOver}>
      {tasks.map((task, index) => (
        <DraggableTaskCard
          key={task.id}
          task={task}
          index={index}
          date={date}
          onDelete={handleDelete}
          onMove={onReorder}
        />
      ))}
    </TaskListContainer>
  );
};
