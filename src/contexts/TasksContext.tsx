import { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Task } from '../types/task';

const STORAGE_KEY = 'calendar_tasks';

interface TasksContextType {
  tasks: Record<string, Task[]>; // key: date (YYYY-MM-DD), value: Task[]
  getTasksForDate: (date: Date) => Task[];
  getTaskById: (taskId: string) => Task | undefined;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Task;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newDate: Date) => void;
  reorderTasks: (date: Date, dragIndex: number, hoverIndex: number) => void;
}

const TasksContext = createContext<TasksContextType | null>(null);

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});

  const setTasksSync = useCallback(
    (
      newTasks: Record<string, Task[]> | ((prev: Record<string, Task[]>) => Record<string, Task[]>)
    ) => {
      const nextTasks = typeof newTasks === 'function' ? newTasks(tasks) : newTasks;
      setTasks(nextTasks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTasks));
    },
    [setTasks, tasks]
  );

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    setTasks(storedTasks ? (JSON.parse(storedTasks) as Record<string, Task[]>) : {});
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setTasksSync(e.newValue ? (JSON.parse(e.newValue) as Record<string, Task[]>) : {});
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [setTasksSync]);

  const getTasksForDate = useCallback(
    (date: Date) => {
      const dateStr = date.toDateString();
      return tasks[dateStr] || [];
    },
    [tasks]
  );

  const getTaskById = useCallback(
    (taskId: string) => {
      for (const date in tasks) {
        const found = tasks[date].find((task: Task) => task.id === taskId);
        if (found) return found;
      }
      return undefined;
    },
    [tasks]
  );

  const addTask = useCallback(
    (task: Omit<Task, 'id' | 'createdAt'>) => {
      const newTask: Task = {
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date().toDateString(),
        date: new Date(task.date).toDateString(),
      };
      setTasksSync(prev => ({
        ...prev,
        [newTask.date]: prev[newTask.date] ? [...prev[newTask.date], newTask] : [newTask],
      }));
      return newTask;
    },
    [setTasksSync]
  );

  const updateTask = useCallback(
    (updatedTask: Task) => {
      const dateStr = new Date(updatedTask.date).toDateString();
      setTasksSync(prev => {
        const updatedDateTasks =
          prev[dateStr]?.map((task: Task) => (task.id === updatedTask.id ? updatedTask : task)) ||
          [];
        return {
          ...prev,
          [dateStr]: updatedDateTasks,
        };
      });
    },
    [setTasksSync]
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      setTasksSync(prev => {
        const newTasks = { ...prev };
        for (const date in newTasks) {
          newTasks[date] = newTasks[date].filter((task: Task) => task.id !== taskId);
          if (newTasks[date].length === 0) {
            delete newTasks[date];
          }
        }
        return newTasks;
      });
    },
    [setTasksSync]
  );

  const moveTask = useCallback(
    (taskId: string, newDate: Date) => {
      setTasksSync(prev => {
        let movedTask: Task | undefined;
        const newTasks = { ...prev };

        // Find and remove the task from its current date
        for (const date in newTasks) {
          const tasksArr = newTasks[date] || [];
          const idx = tasksArr?.findIndex(task => task.id === taskId);
          if (idx !== undefined && idx !== -1) {
            movedTask = { ...tasksArr[idx], date: newDate.toDateString() };
            tasksArr.splice(idx, 1);
            if (tasksArr.length === 0) {
              delete newTasks[date];
            }
            break;
          }
        }

        // Add the moved task to the end of the new date's list
        if (movedTask) {
          const newDateStr = newDate.toDateString();
          newTasks[newDateStr] = newTasks[newDateStr]
            ? [...newTasks[newDateStr], movedTask]
            : [movedTask];
        }

        return newTasks;
      });
    },
    [setTasksSync]
  );

  const reorderTasks = useCallback(
    (date: Date, dragIndex: number, hoverIndex: number) => {
      const dateStr = date.toDateString();
      setTasksSync(prev => {
        const dateTasks = prev[dateStr] ? [...prev[dateStr]] : [];
        const draggedTask = dateTasks[dragIndex];
        if (!draggedTask) return prev;
        dateTasks.splice(dragIndex, 1);
        dateTasks.splice(hoverIndex, 0, draggedTask);
        return {
          ...prev,
          [dateStr]: dateTasks,
        };
      });
    },
    [setTasksSync]
  );

  const value = useMemo(
    () => ({
      tasks,
      getTasksForDate,
      getTaskById,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      reorderTasks,
    }),
    [tasks, getTasksForDate, getTaskById, addTask, updateTask, deleteTask, moveTask, reorderTasks]
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
