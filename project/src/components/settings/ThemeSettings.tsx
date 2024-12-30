import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ] as const;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Theme</h3>
      <div className="grid grid-cols-3 gap-3">
        {themes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value as 'light' | 'dark' | 'system')}
            className={`flex flex-col items-center p-4 rounded-lg border transition-colors ${
              theme === value
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/50 dark:border-indigo-400'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <Icon className={`h-6 w-6 ${
              theme === value 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`} />
            <span className={`mt-2 text-sm font-medium ${
              theme === value
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}>{label}</span>
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Choose how KitchenSync should appear to you
      </p>
    </div>
  );
}