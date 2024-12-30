import { supabase } from './supabase';
import { TaskGroup } from '../types/tasks';

export async function getTaskGroups(): Promise<TaskGroup[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('task_groups')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) throw error;

  return data.map(group => ({
    ...group,
    userId: group.user_id,
    createdAt: new Date(group.created_at),
    updatedAt: new Date(group.updated_at)
  }));
}

export async function createTaskGroup(name: string, description?: string, color: string = '#1DB954'): Promise<TaskGroup> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('task_groups')
    .insert([{
      user_id: user.id,
      name,
      description,
      color
    }])
    .select()
    .single();

  if (error) throw error;

  return {
    ...data,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  };
}

export async function updateTaskGroup(
  id: string,
  updates: Partial<Pick<TaskGroup, 'name' | 'description' | 'color'>>
): Promise<TaskGroup> {
  const { data, error } = await supabase
    .from('task_groups')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return {
    ...data,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  };
}

export async function deleteTaskGroup(id: string): Promise<void> {
  const { error } = await supabase
    .from('task_groups')
    .delete()
    .eq('id', id);

  if (error) throw error;
}