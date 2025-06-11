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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  font-size: 1.5rem;
  color: #333;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background: #f5f5f5;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;
  width: fit-content;

  &:hover {
    background: #1565c0;
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
    background: #ddd;
    border-radius: 2px;
  }
`;

const TaskItem = styled.div`
  padding: 12px;
  border-radius: 8px;
  background: white;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #1976d2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  color: #333;
`;

const TaskDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
  white-space: pre-wrap;
  word-break: break-word;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' }>`
  padding: 6px;
  border: none;
  border-radius: 6px;
  background: ${({ $variant }) => ($variant === 'delete' ? '#fee2e2' : 'white')};
  color: ${({ $variant }) => ($variant === 'delete' ? '#dc2626' : '#666')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $variant }) => ($variant === 'delete' ? '#fecaca' : '#f5f5f5')};
    color: ${({ $variant }) => ($variant === 'delete' ? '#dc2626' : '#333')};
  }
`;

const EmptyStateMessage = styled.div`
  text-align: center;
  color: #666;
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
                    $variant="delete"
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
