import React from 'react';
import { useSettings } from '../../hooks/useSettings';

export function NotificationSettings() {
  const { settings, updateSettings } = useSettings();
  const notifications = settings?.notifications || {
    taskReminders: true,
    dueDateAlerts: true,
    shoppingListUpdates: true
  };

  const handleToggle = (key: keyof typeof notifications) => {
    updateSettings({
      notifications: {
        ...notifications,
        [key]: !notifications[key]
      }
    });
  };

  const options = [
    { key: 'taskReminders', label: 'Task Reminders', description: 'Get notified about upcoming tasks' },
    { key: 'dueDateAlerts', label: 'Due Date Alerts', description: 'Receive alerts when tasks are due' },
    { key: 'shoppingListUpdates', label: 'Shopping List Updates', description: 'Get notified about shopping list changes' }
  ] as const;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
      <div className="space-y-4">
        {options.map(({ key, label, description }) => (
          <div key={key} className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            <button
              onClick={() => handleToggle(key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications[key] 
                  ? 'bg-indigo-600 dark:bg-indigo-500' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications[key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Choose which notifications you want to receive
      </p>
    </div>
  );
}