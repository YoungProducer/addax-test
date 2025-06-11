import { useState } from 'react';
import styled from 'styled-components';
import { Trash2 } from 'lucide-react';
import type { Task } from '../../types/task';
import { TaskInfoModal } from './TaskInfoModal';

const Card = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 6px;
  font-size: 0.85rem;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #f8f9fa;
    border-color: #1976d2;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  position: relative;
`;

const Title = styled.div`
  font-weight: 600;
  color: #1976d2;
  font-size: 0.9rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: padding-right 0.2s;

  ${TitleRow}:hover & {
    padding-right: 32px;
  }
`;

const Description = styled.div`
  color: #666;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
`;

const Actions = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  padding-left: 8px;

  ${TitleRow}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &.delete {
    color: #dc3545;
    &:hover {
      background: rgba(220, 53, 69, 0.1);
    }
  }
`;

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
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
      <Card onClick={handleClick}>
        <TitleRow>
          <Title title={task.title}>{task.title}</Title>
          <Actions>
            <ActionButton className="delete" onClick={() => onDelete(task.id)} title="Delete task">
              <Trash2 size={14} />
            </ActionButton>
          </Actions>
        </TitleRow>
        {task.description && <Description title={task.description}>{task.description}</Description>}
      </Card>
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
