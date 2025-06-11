import { useState } from 'react';
import styled from 'styled-components';
import { Trash2, Edit2 } from 'lucide-react';
import type { Task } from '../../types/task';
import { TaskInfoModal } from './TaskInfoModal';

const TaskCardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.default};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[50]};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const TaskContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TaskTitle = styled.h3`
  margin: 0 0 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TaskDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: pre-wrap;
  word-break: break-word;
`;

const TaskActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
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

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onDelete, onEdit }: TaskCardProps) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Don't show modal if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setShowInfoModal(true);
  };

  return (
    <>
      <TaskCardContainer onClick={handleClick}>
        <TaskContent>
          <TaskTitle>{task.title}</TaskTitle>
          {task.description && <TaskDescription>{task.description}</TaskDescription>}
        </TaskContent>
        <TaskActions>
          <ActionButton
            onClick={e => {
              e.stopPropagation();
              onEdit(task);
            }}
            title="Edit task"
          >
            <Edit2 size={14} />
          </ActionButton>
          <ActionButton
            variant="delete"
            onClick={e => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            title="Delete task"
          >
            <Trash2 size={14} />
          </ActionButton>
        </TaskActions>
      </TaskCardContainer>
      {showInfoModal && (
        <TaskInfoModal
          task={task}
          onClose={() => setShowInfoModal(false)}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </>
  );
};
