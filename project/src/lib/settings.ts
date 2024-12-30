import { supabase } from './supabase';
import { UserSettings } from '../types/settings';

const defaultSettings: UserSettings = {
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  theme: 'system',
  dateFormat: 'MM/DD/YYYY',
  weekStartsOn: 0,
  defaultTaskPriority: 'medium',
  defaultView: 'dashboard',
  shoppingListSort: 'category',
  notifications: {
    taskReminders: true,
    dueDateAlerts: true,
    shoppingListUpdates: true
  }
};

export async function getUserSettings(): Promise<UserSettings> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) throw error;
  
  if (!data) {
    // No settings found, create default settings
    return createDefaultSettings();
  }

  return {
    timezone: data.timezone,
    theme: data.theme,
    dateFormat: data.date_format,
    weekStartsOn: data.week_starts_on,
    defaultTaskPriority: data.default_task_priority,
    defaultView: data.default_view,
    shoppingListSort: data.shopping_list_sort,
    notifications: data.notifications
  };
}

export async function updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const updateData = {
    timezone: settings.timezone,
    theme: settings.theme,
    date_format: settings.dateFormat,
    week_starts_on: settings.weekStartsOn,
    default_task_priority: settings.defaultTaskPriority,
    default_view: settings.defaultView,
    shopping_list_sort: settings.shoppingListSort,
    notifications: settings.notifications,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('user_settings')
    .upsert({
      user_id: user.id,
      ...updateData
    })
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return getUserSettings();
}

async function createDefaultSettings(): Promise<UserSettings> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('user_settings')
    .insert([{
      user_id: user.id,
      ...defaultSettings
    }])
    .select()
    .single();

  if (error) {
    // If insert fails due to race condition, try to get existing settings
    if (error.code === '23505') {
      const { data: existingData, error: fetchError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (fetchError) throw fetchError;
      return getUserSettings();
    }
    throw error;
  }

  return getUserSettings();
}