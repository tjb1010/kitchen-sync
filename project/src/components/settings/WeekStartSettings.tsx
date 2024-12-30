import React from 'react';
import { useSettings } from '../../hooks/useSettings';

export function WeekStartSettings() {
  const { settings, updateSettings } = useSettings();
  const weekStartsOn = settings?.weekStartsOn ?? 0;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Week Starts On</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => updateSettings({ weekStartsOn: 0 })}
          className={`p-4 rounded-lg border transition-colors ${
            weekStartsOn === 0
              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/50 dark:border-indigo-400'
              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          <span className={`text-sm font-medium ${
            weekStartsOn === 0
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-700 dark:text-gray-300'
          }`}>Sunday</span>
        </button>
        <button
          onClick={() => updateSettings({ weekStartsOn: 1 })}
          className={`p-4 rounded-lg border transition-colors ${
            weekStartsOn === 1
              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/50 dark:border-indigo-400'
              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          <span className={`text-sm font-medium ${
            weekStartsOn === 1
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-700 dark:text-gray-300'
          }`}>Monday</span>
        </button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Choose which day your week should start on
      </p>
    </div>
  );
}