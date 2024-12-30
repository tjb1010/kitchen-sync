import React from 'react';

interface MetricMeasurementsProps {
  weight: number;
  height: number;
  onWeightChange: (weight: number) => void;
  onHeightChange: (height: number) => void;
}

export function MetricMeasurements({ 
  weight, 
  height, 
  onWeightChange, 
  onHeightChange 
}: MetricMeasurementsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Weight (kg)</label>
        <input
          type="number"
          step="0.1"
          min="20"
          max="300"
          required
          value={weight}
          onChange={(e) => onWeightChange(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Height (cm)</label>
        <input
          type="number"
          min="100"
          max="250"
          required
          value={height}
          onChange={(e) => onHeightChange(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}