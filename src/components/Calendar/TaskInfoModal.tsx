import styled from 'styled-components';
import { Trash2, Save } from 'lucide-react';
import type { Task } from '../../types/task';
import { useState, useRef, useEffect } from 'react';
import { useTasks } from '../../contexts/TasksContext';
import { Modal } from '../Modal/Modal';

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
  cursor: pointer;
  padding: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[50]};
  }
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

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-right: auto;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const TitleInput = styled.input`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.background.default};
  font-family: inherit;
  font-weight: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const EditableDescription = styled.div`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  min-height: 100px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[100]};
  }
`;

const DescriptionTextarea = styled.textarea`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: inherit;
  resize: none;
  overflow: hidden;
  min-height: 100px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.paper};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light + '40'};
  }
`;

const SaveButton = styled.button`
  padding: 6px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.success.light + '20'};
  color: ${({ theme }) => theme.colors.success.main};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-left: auto;

  &:hover {
    background: ${({ theme }) => theme.colors.success.light + '80'};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

interface TaskInfoModalProps {
  task: Task;
  onClose: () => void;
  isOpen?: boolean;
  currentDate?: Date;
}

export const TaskInfoModal = ({
  task,
  onClose,
  isOpen = true,
  currentDate,
}: TaskInfoModalProps) => {
  const isNewTask = !task.id;
  const [isEditingTitle, setIsEditingTitle] = useState(isNewTask);
  const [isEditingDescription, setIsEditingDescription] = useState(isNewTask);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [hasChanges, setHasChanges] = useState(isNewTask);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const { addTask, updateTask, deleteTask } = useTasks();

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    if (isEditingDescription && descriptionTextareaRef.current) {
      adjustTextareaHeight(descriptionTextareaRef.current);
    }
  }, [isEditingDescription]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = () => {
    if (!isNewTask) {
      deleteTask(task.id);
    }
    onClose();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
    setHasChanges(true);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(e.target.value);
    setHasChanges(true);
    adjustTextareaHeight(e.target);
  };

  const handleSave = () => {
    const taskDate = currentDate ? currentDate.toDateString() : new Date(task.date).toDateString();

    if (isNewTask) {
      addTask({
        title: editedTitle,
        description: editedDescription,
        date: taskDate,
      });
    } else {
      const updatedTask = {
        ...task,
        title: editedTitle,
        description: editedDescription,
        date: taskDate,
      };
      updateTask(updatedTask);
    }

    setHasChanges(false);
    setIsEditingTitle(false);
    setIsEditingDescription(false);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'title' | 'description') => {
    if (e.key === 'Escape') {
      if (type === 'title') {
        setEditedTitle(task.title);
        setIsEditingTitle(false);
      } else {
        setEditedDescription(task.description || '');
        setIsEditingDescription(false);
      }
      setHasChanges(false);
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingTitle(true);
  };

  const handleDescriptionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingDescription(true);
  };

  const handleTitleBlur = () => {
    if (!editedTitle) {
      return;
    }

    setIsEditingTitle(false);
    if (editedTitle !== task.title || editedDescription !== task.description) {
      setHasChanges(true);
    }
  };

  const handleDescriptionBlur = () => {
    if (!editedDescription) {
      return;
    }

    setIsEditingDescription(false);
    if (editedTitle !== task.title || editedDescription !== task.description) {
      setHasChanges(true);
    }
  };

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        {isEditingTitle ? (
          <TitleInput
            ref={titleInputRef}
            value={editedTitle}
            onChange={handleTitleChange}
            onClick={handleModalClick}
            onBlur={handleTitleBlur}
            onKeyDown={e => handleKeyDown(e, 'title')}
            placeholder="Enter task title"
            autoFocus
          />
        ) : (
          <Title onClick={handleTitleClick}>{editedTitle || 'Untitled Task'}</Title>
        )}
      </Modal.Header>
      <Modal.Body>
        <DescriptionSection>
          {isEditingDescription ? (
            <DescriptionTextarea
              ref={descriptionTextareaRef}
              value={editedDescription}
              onChange={handleDescriptionChange}
              onClick={handleModalClick}
              onBlur={handleDescriptionBlur}
              onKeyDown={e => handleKeyDown(e, 'description')}
              placeholder="Add a description..."
              autoFocus={!isEditingTitle}
            />
          ) : (
            <EditableDescription onClick={handleDescriptionClick}>
              {editedDescription || 'Add a description...'}
            </EditableDescription>
          )}
          <BottomRow>
            {!isNewTask && <DateText>Created on {formatDate(task.createdAt)}</DateText>}
            <Controls>
              {hasChanges && (
                <SaveButton onClick={handleSave} title={isNewTask ? 'Create task' : 'Save changes'}>
                  <Save size={16} />
                </SaveButton>
              )}
              {!isNewTask && (
                <ActionButton variant="delete" onClick={handleDelete} title="Delete task">
                  <Trash2 size={16} />
                </ActionButton>
              )}
            </Controls>
          </BottomRow>
        </DescriptionSection>
      </Modal.Body>
    </Modal.Root>
  );
};
