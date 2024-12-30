import React from 'react';
import { UnitSystem } from '../../types/nutrition';

interface UnitSystemToggleProps {
  unitSystem: UnitSystem;
  onUnitSystemChange: (system: UnitSystem) => void;
}

export function UnitSystemToggle({ unitSystem, onUnitSystemChange }: UnitSystemToggleProps) {
  return (
    <div className="flex justify-end space-x-2 mb-4">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          onClick={() => onUnitSystemChange('metric')}
          className={`px-4 py-2 text-sm font-medium ${
            unitSystem === 'metric'
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
          } border border-gray-300 dark:border-gray-600 rounded-l-lg focus:z-10 focus:ring-2 focus:ring-indigo-500`}
        >
          Metric
        </button>
        <button
          type="button"
          onClick={() => onUnitSystemChange('imperial')}
          className={`px-4 py-2 text-sm font-medium ${
            unitSystem === 'imperial'
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
          } border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg focus:z-10 focus:ring-2 focus:ring-indigo-500`}
        >
          Imperial
        </button>
      </div>
    </div>
  );
}