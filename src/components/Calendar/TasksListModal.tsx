import styled from 'styled-components';
import { X, Plus, Trash2 } from 'lucide-react';
import { Portal } from '../Portal/Portal';
import type { Task } from '../../types/task';
import { useState, useEffect } from 'react';
import { TaskInfoModal } from './TaskInfoModal';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 24px;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.modal};
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[100]};
  }
`;

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

const TaskItem = styled.div`
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const TaskContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TaskTitle = styled.h3`
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TaskDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: pre-wrap;
  word-break: break-word;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  padding: 6px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme, variant }) =>
    variant === 'delete' ? theme.colors.error.light + '20' : theme.colors.neutral[50]};
  color: ${({ theme, variant }) =>
    variant === 'delete' ? theme.colors.error.main : theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, variant }) =>
      variant === 'delete' ? theme.colors.error.light + '40' : theme.colors.neutral[100]};
    color: ${({ theme, variant }) =>
      variant === 'delete' ? theme.colors.error.main : theme.colors.text.primary};
  }
`;

const EmptyStateMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 20px;
`;

interface TasksListModalProps {
  date: Date;
  tasks: Task[];
  onClose: () => void;
  onAddTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const TasksListModal = ({
  date,
  tasks: initialTasks,
  onClose,
  onAddTask,
  onDeleteTask,
  onEditTask,
}: TasksListModalProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState(initialTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Update local tasks when initialTasks changes
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleTaskClick = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setSelectedTask(task);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    onEditTask(updatedTask);
  };

  const handleAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    onAddTask(newTask);
    setIsAddingTask(false);
  };

  const handleCloseTaskModal = () => {
    setSelectedTask(null);
    setIsAddingTask(false);
  };

  return (
    <Portal>
      <ModalOverlay>
        <ModalContent>
          <Header>
            <Title>{formatDate(date)}</Title>
            <CloseButton onClick={onClose} title="Close">
              <X size={20} />
            </CloseButton>
          </Header>
          <ButtonWrapper>
            <AddButton onClick={() => setIsAddingTask(true)}>
              <Plus size={20} />
              Add Task
            </AddButton>
          </ButtonWrapper>
          <TasksList>
            {tasks.map(task => (
              <TaskItem key={task.id} onClick={e => handleTaskClick(e, task)}>
                <TaskContent>
                  <TaskTitle>{task.title}</TaskTitle>
                  {task.description && <TaskDescription>{task.description}</TaskDescription>}
                </TaskContent>
                <TaskActions>
                  <ActionButton
                    variant="delete"
                    onClick={() => onDeleteTask(task.id)}
                    title="Delete task"
                  >
                    <Trash2 size={16} />
                  </ActionButton>
                </TaskActions>
              </TaskItem>
            ))}
            {tasks.length === 0 && <EmptyStateMessage>No tasks for this day</EmptyStateMessage>}
          </TasksList>
          {(selectedTask || isAddingTask) && (
            <TaskInfoModal
              task={
                selectedTask || {
                  id: '',
                  title: '',
                  description: '',
                  createdAt: new Date().toISOString(),
                  date: date.toISOString(),
                }
              }
              onClose={handleCloseTaskModal}
              onDelete={onDeleteTask}
              onEdit={selectedTask ? handleEditTask : handleAddTask}
            />
          )}
        </ModalContent>
      </ModalOverlay>
    </Portal>
  );
};
