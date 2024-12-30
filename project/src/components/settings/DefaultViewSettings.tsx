import React from 'react';
import { Layout, ClipboardList, ShoppingBasket, Activity } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

export function DefaultViewSettings() {
  const { settings, updateSettings } = useSettings();
  const defaultView = settings?.defaultView || 'dashboard';

  const views = [
    { value: 'dashboard', label: 'Dashboard', icon: Layout },
    { value: 'tasks', label: 'Tasks', icon: ClipboardList },
    { value: 'shopping', label: 'Shopping', icon: ShoppingBasket },
    { value: 'nutrition', label: 'Nutrition', icon: Activity }
  ] as const;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Default View</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {views.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => updateSettings({ defaultView: value })}
            className={`flex flex-col items-center p-4 rounded-lg border transition-colors ${
              defaultView === value
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/50 dark:border-indigo-400'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <Icon className={`h-6 w-6 ${
              defaultView === value 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`} />
            <span className={`mt-2 text-sm font-medium ${
              defaultView === value
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}>{label}</span>
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Choose which view to show when you first open the app
      </p>
    </div>
  );
}