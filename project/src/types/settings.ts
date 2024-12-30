export interface UserSettings {
  timezone: string;
  theme: 'light' | 'dark' | 'system';
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  weekStartsOn: 0 | 1; // 0 = Sunday, 1 = Monday
  defaultTaskPriority: 'low' | 'medium' | 'high';
  defaultView: 'dashboard' | 'tasks' | 'shopping' | 'nutrition';
  shoppingListSort: 'category' | 'name' | 'recent';
  notifications: {
    taskReminders: boolean;
    dueDateAlerts: boolean;
    shoppingListUpdates: boolean;
  };
}