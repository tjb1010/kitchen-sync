import { supabase } from './supabase';
import { Task } from '../types/tasks';
import { getUserSettings } from './settings';
import { DateService } from '../services/dateService';

interface CreateTaskData extends Omit<Task, 'id'> {}
interface UpdateTaskData extends Partial<Omit<Task, 'id'>> {}

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return Promise.all(data.map(transformTaskFromDB));
}

export async function createTask(taskData: CreateTaskData): Promise<Task> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated to create tasks');

  const dbTask = await transformTaskToDB(taskData);
  
  const { data, error } = await supabase
    .from('tasks')
    .insert([{
      ...dbTask,
      user_id: user.id,
      group_id: taskData.groupId || null
    }])
    .select()
    .single();

  if (error) throw error;
  return transformTaskFromDB(data);
}

export async function updateTask(id: string, taskData: UpdateTaskData): Promise<Task> {
  const dbTask = await transformTaskToDB(taskData);
  const { data, error } = await supabase
    .from('tasks')
    .update(dbTask)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return transformTaskFromDB(data);
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

async function transformTaskFromDB(dbTask: any): Promise<Task> {
  const { timezone } = await getUserSettings();
  
  return {
    id: dbTask.id,
    title: dbTask.title,
    description: dbTask.description,
    dueDate: dbTask.due_date ? DateService.toLocal(dbTask.due_date, timezone) : undefined,
    priority: dbTask.priority,
    status: dbTask.status,
    category: dbTask.category,
    groupId: dbTask.group_id
  };
}

async function transformTaskToDB(task: Partial<Task>): Promise<any> {
  const { timezone } = await getUserSettings();
  
  const dbTask: any = {
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    category: task.category,
    group_id: task.groupId || null
  };

  if (task.dueDate) {
    dbTask.due_date = DateService.toUTC(task.dueDate, timezone).toISOString();
  }

  return dbTask;
}