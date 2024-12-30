import { useState, useEffect } from 'react';
import { TaskGroup } from '../types/tasks';
import { getTaskGroups, createTaskGroup, updateTaskGroup, deleteTaskGroup } from '../lib/taskGroups';

export function useTaskGroups() {
  const [groups, setGroups] = useState<TaskGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    try {
      setLoading(true);
      const data = await getTaskGroups();
      setGroups(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load task groups'));
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateGroup(name: string, description?: string, color?: string) {
    try {
      const newGroup = await createTaskGroup(name, description, color);
      setGroups(current => [...current, newGroup]);
      return newGroup;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create task group'));
      throw err;
    }
  }

  async function handleUpdateGroup(id: string, updates: Parameters<typeof updateTaskGroup>[1]) {
    try {
      const updatedGroup = await updateTaskGroup(id, updates);
      setGroups(current =>
        current.map(group => (group.id === id ? updatedGroup : group))
      );
      return updatedGroup;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update task group'));
      throw err;
    }
  }

  async function handleDeleteGroup(id: string) {
    try {
      await deleteTaskGroup(id);
      setGroups(current => current.filter(group => group.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete task group'));
      throw err;
    }
  }

  return {
    groups,
    loading,
    error,
    createGroup: handleCreateGroup,
    updateGroup: handleUpdateGroup,
    deleteGroup: handleDeleteGroup,
    refreshGroups: loadGroups
  };
}