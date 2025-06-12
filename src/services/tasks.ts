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
    createdAt: new Date().toDateString(),
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

export const updateTask = (updatedTask: Task): void => {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
};

export const getTasksForDate = (date: Date): Task[] => {
  const tasks = getTasks();
  const dateStr = date.toDateString();
  return tasks.filter(task => task.date.startsWith(dateStr));
};

export const getTaskById = (taskId: string): Task | undefined => {
  const tasks = getTasks();
  return tasks.find(task => task.id === taskId);
};

export const createTask = (task: Omit<Task, 'id' | 'createdAt'>): Task => {
  return {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date().toDateString(),
  };
};

export const formatDate = (date: Date): string => {
  return date.toDateString();
};
