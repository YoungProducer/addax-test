import { useDrag, useDrop } from 'react-dnd';
import { TaskCard } from './TaskCard';
import type { Task } from '../../types/task';
import { useRef } from 'react';
import { useTasks } from '../../contexts/TasksContext';

interface DraggableTaskCardProps {
  task: Task;
  index: number;
  date: Date;
  onDelete: (taskId: string) => void;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
}

export const DraggableTaskCard = ({
  task,
  date,
  index,
  onDelete,
  onMove,
}: DraggableTaskCardProps) => {
  const { reorderTasks } = useTasks();

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { type: 'TASK', id: task.id, index, task },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    // Prevent dragging if clicking on action buttons
    canDrag: monitor => {
      const target = monitor.getClientOffset();
      if (!target) return true;
      const element = document.elementFromPoint(target.x, target.y);
      return !element?.closest('button');
    },
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (item: { type: string; id: string; index: number; task: Task }, monitor) => {
      if (!item || item.index === index) {
        return;
      }

      if (item.task.date !== task.date) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      if (!hoverBoundingRect) return;
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (onMove) {
        onMove(dragIndex, hoverIndex);
      } else {
        reorderTasks(date, item.index, index);
      }

      item.index = index;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        boxShadow: isDragging ? '0 0 10px 0 rgba(0, 0, 0, 0.1)' : 'none',
        cursor: 'grab',
        position: 'relative',
        zIndex: isDragging ? 1000 : 'auto',
      }}
    >
      <TaskCard task={task} onDelete={onDelete} />
    </div>
  );
};
