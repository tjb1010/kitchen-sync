import { useState, useEffect } from 'react';
import { Task } from '../types/tasks';
import { fetchTasks, createTask as apiCreateTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from '../lib/tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load tasks'));
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTask(taskData: Omit<Task, 'id'>) {
    try {
      const newTask = await apiCreateTask(taskData);
      setTasks(current => [newTask, ...current]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create task'));
      throw err;
    }
  }

  async function handleUpdateTask(id: string, taskData: Partial<Omit<Task, 'id'>>) {
    try {
      const updatedTask = await apiUpdateTask(id, taskData);
      setTasks(current =>
        current.map(task => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update task'));
      throw err;
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      await apiDeleteTask(id);
      setTasks(current => current.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete task'));
      throw err;
    }
  }

  return {
    tasks,
    loading,
    error,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    refreshTasks: loadTasks
  };
}