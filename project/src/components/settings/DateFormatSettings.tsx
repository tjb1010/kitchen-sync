import React from 'react';
import { useSettings } from '../../hooks/useSettings';

export function DateFormatSettings() {
  const { settings, updateSettings } = useSettings();
  const dateFormat = settings?.dateFormat || 'MM/DD/YYYY';

  const formats = [
    { value: 'MM/DD/YYYY', label: '12/31/2024' },
    { value: 'DD/MM/YYYY', label: '31/12/2024' },
    { value: 'YYYY-MM-DD', label: '2024-12-31' }
  ] as const;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Date Format</h3>
      <div className="grid grid-cols-3 gap-3">
        {formats.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => updateSettings({ dateFormat: value })}
            className={`p-4 rounded-lg border transition-colors ${
              dateFormat === value
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/50 dark:border-indigo-400'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <span className={`text-sm font-medium ${
              dateFormat === value
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}>{label}</span>
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Choose how dates should be displayed throughout the app
      </p>
    </div>
  );
}