import { useState, useEffect } from 'react';
import { TaskComment } from '../types/tasks';
import { getTaskComments, createTaskComment, updateTaskComment, deleteTaskComment } from '../lib/taskComments';

export function useTaskComments(taskId: string) {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (taskId) {
      loadComments();
    }
  }, [taskId]);

  async function loadComments() {
    try {
      setLoading(true);
      const data = await getTaskComments(taskId);
      setComments(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load comments'));
    } finally {
      setLoading(false);
    }
  }

  async function addComment(content: string) {
    try {
      const newComment = await createTaskComment(taskId, content);
      setComments(current => [...current, newComment]);
      return newComment;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add comment'));
      throw err;
    }
  }

  async function editComment(id: string, content: string) {
    try {
      const updatedComment = await updateTaskComment(id, content);
      setComments(current =>
        current.map(comment => (comment.id === id ? updatedComment : comment))
      );
      return updatedComment;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update comment'));
      throw err;
    }
  }

  async function removeComment(id: string) {
    try {
      await deleteTaskComment(id);
      setComments(current => current.filter(comment => comment.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete comment'));
      throw err;
    }
  }

  return {
    comments,
    loading,
    error,
    addComment,
    editComment,
    removeComment,
    refreshComments: loadComments
  };
}