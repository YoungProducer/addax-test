import styled from 'styled-components';
import { Plus } from 'lucide-react';
import type { Task } from '../../types/task';
import { useState } from 'react';
import { TaskInfoModal } from './TaskInfoModal';
import { DroppableTaskList } from './DroppableTaskList';
import { useTasks } from '../../contexts/TasksContext';
import { Modal } from '../Modal/Modal';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  border: none;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const TasksList = styled.div`
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 4px;

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

const EmptyStateMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 20px;
`;

interface TasksListModalProps {
  date: Date;
  onClose: () => void;
  isOpen: boolean;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const TasksListModal = ({ date, onClose, isOpen }: TasksListModalProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { getTasksForDate, deleteTask, reorderTasks } = useTasks();
  const tasks = getTasksForDate(date);

  const handleCloseTaskModal = () => {
    setSelectedTask(null);
    setIsAddingTask(false);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleReorderTasks = (dragIndex: number, hoverIndex: number) => {
    reorderTasks(date, dragIndex, hoverIndex);
  };

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{formatDate(date)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ButtonWrapper>
          <AddButton onClick={() => setIsAddingTask(true)}>
            <Plus size={20} />
            Add Task
          </AddButton>
        </ButtonWrapper>
        <TasksList>
          <DroppableTaskList
            tasks={tasks}
            date={date}
            onDelete={handleDeleteTask}
            onReorder={handleReorderTasks}
          />
          {tasks.length === 0 && <EmptyStateMessage>No tasks for this day</EmptyStateMessage>}
        </TasksList>
      </Modal.Body>
      {(selectedTask || isAddingTask) && (
        <TaskInfoModal
          task={
            selectedTask || {
              id: '',
              title: '',
              description: '',
              createdAt: new Date().toDateString(),
              date: date.toDateString(),
            }
          }
          onClose={handleCloseTaskModal}
          currentDate={date}
        />
      )}
    </Modal.Root>
  );
};
