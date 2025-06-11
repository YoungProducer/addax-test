import { useState } from 'react';
import styled from 'styled-components';
import type { Task } from '../../types/task';
import { Modal } from '../Modal/Modal';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
  background: white;
  color: #333;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
  background: white;
  color: #333;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const SubmitButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1565c0;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

interface TaskModalProps {
  date: Date;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  initialTask?: Task | null;
  isOpen: boolean;
}

export const TaskModal = ({ date, onClose, onSubmit, initialTask, isOpen }: TaskModalProps) => {
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      date: date.toISOString(),
    });
    onClose();
  };

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>
          {initialTask ? 'Edit Task' : 'Add Task'} for {date.toLocaleDateString()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </FormGroup>
          <Modal.Footer>
            <SubmitButton type="submit" disabled={!title.trim()}>
              {initialTask ? 'Update Task' : 'Create Task'}
            </SubmitButton>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal.Root>
  );
};
