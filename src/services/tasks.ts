import type { Task } from '../types/task';

const STORAGE_KEY = 'calendar_tasks';

export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTask = (task: Omit<Task, 'id' | 'createdAt'>): Task => {
  const tasks = getTasks();
  const newTask: Task = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const updatedTasks = [...tasks, newTask];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  return newTask;
};

export const deleteTask = (taskId: string): void => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
};

export const getTasksForDate = (date: Date): Task[] => {
  const tasks = getTasks();
  const dateStr = date.toISOString().split('T')[0];
  return tasks.filter(task => task.date.startsWith(dateStr));
};
