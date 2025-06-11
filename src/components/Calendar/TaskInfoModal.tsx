import styled from 'styled-components';
import { Trash2, Save, X } from 'lucide-react';
import { Portal } from '../Portal/Portal';
import type { Task } from '../../types/task';
import { useState, useRef, useEffect } from 'react';

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
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
  padding-right: 40px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
  flex: 1;
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

const DescriptionSection = styled.div`
  margin: 16px 0;
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
  color: #666;
  font-size: 0.875rem;
  margin-right: auto;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const EditableTitle = styled.div`
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  width: 100%;

  &:hover {
    background: #f5f5f5;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 1.25rem;
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-weight: inherit;
  color: #333;
  background: white;
  z-index: 1;
  min-height: 36px;
  line-height: 1.5;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
  }
`;

const EditableDescription = styled.div`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  min-height: 100px;
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;

  &:hover {
    background: #f5f5f5;
  }
`;

const DescriptionTextarea = styled.textarea`
  width: 100%;
  font-size: 1rem;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  color: #333;
  background: white;
  resize: none;
  overflow: hidden;
  min-height: 100px;
  line-height: 1.5;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
  }
`;

const SaveButton = styled.button`
  padding: 6px;
  border: none;
  border-radius: 6px;
  background: #e6f4ea;
  color: #1e7e34;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-left: auto;

  &:hover {
    background: #d4edda;
  }

  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  z-index: 2;

  &:hover {
    background: #f5f5f5;
  }
`;

interface TaskInfoModalProps {
  task: Task;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskInfoModal = ({ task, onClose, onDelete, onEdit }: TaskInfoModalProps) => {
  const isNewTask = !task.id;
  const [isEditingTitle, setIsEditingTitle] = useState(isNewTask);
  const [isEditingDescription, setIsEditingDescription] = useState(isNewTask);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [hasChanges, setHasChanges] = useState(isNewTask);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

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
    onDelete(task.id);
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
    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription,
    };
    onEdit(updatedTask);
    setHasChanges(false);
    setIsEditingTitle(false);
    setIsEditingDescription(false);
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
    <Portal>
      <ModalOverlay onClick={handleModalClick}>
        <ModalContent onClick={handleModalClick}>
          <CloseButton onClick={onClose} title="Close">
            <X size={20} />
          </CloseButton>
          <Header>
            {isEditingTitle ? (
              <TitleInput
                ref={titleInputRef}
                value={editedTitle}
                onChange={handleTitleChange}
                onKeyDown={e => handleKeyDown(e, 'title')}
                onClick={handleModalClick}
                onBlur={handleTitleBlur}
                autoFocus
                placeholder="Enter task title..."
              />
            ) : (
              <EditableTitle onClick={handleTitleClick}>
                <Title>{editedTitle}</Title>
              </EditableTitle>
            )}
          </Header>
          <DescriptionSection>
            {isEditingDescription ? (
              <DescriptionTextarea
                ref={descriptionTextareaRef}
                value={editedDescription}
                onChange={handleDescriptionChange}
                onKeyDown={e => handleKeyDown(e, 'description')}
                placeholder="Add a description..."
                onClick={handleModalClick}
                onBlur={handleDescriptionBlur}
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
                  <SaveButton
                    onClick={handleSave}
                    title={isNewTask ? 'Create task' : 'Save changes'}
                  >
                    <Save size={16} />
                  </SaveButton>
                )}
                {!isNewTask && (
                  <ActionButton $variant="delete" onClick={handleDelete} title="Delete task">
                    <Trash2 size={16} />
                  </ActionButton>
                )}
              </Controls>
            </BottomRow>
          </DescriptionSection>
        </ModalContent>
      </ModalOverlay>
    </Portal>
  );
};
