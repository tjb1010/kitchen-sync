import { supabase } from './supabase';
import { TaskComment } from '../types/tasks';

export async function getTaskComments(taskId: string): Promise<TaskComment[]> {
  const { data, error } = await supabase
    .from('task_comments')
    .select('*')
    .eq('task_id', taskId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  return data.map(comment => ({
    ...comment,
    id: comment.id,
    taskId: comment.task_id,
    userId: comment.user_id,
    createdAt: new Date(comment.created_at),
    updatedAt: new Date(comment.updated_at)
  }));
}

export async function createTaskComment(taskId: string, content: string): Promise<TaskComment> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('task_comments')
    .insert([{
      task_id: taskId,
      user_id: user.id,
      content
    }])
    .select()
    .single();

  if (error) throw error;

  return {
    ...data,
    taskId: data.task_id,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  };
}

export async function updateTaskComment(id: string, content: string): Promise<TaskComment> {
  const { data, error } = await supabase
    .from('task_comments')
    .update({ content })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return {
    ...data,
    taskId: data.task_id,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  };
}

export async function deleteTaskComment(id: string): Promise<void> {
  const { error } = await supabase
    .from('task_comments')
    .delete()
    .eq('id', id);

  if (error) throw error;
}