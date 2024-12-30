import React from 'react';
import { Tooltip } from '../ui/Tooltip';

interface MacroProgressBarProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

export function MacroProgressBar({ label, value, max, unit, color }: MacroProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <Tooltip content={`${value}g of ${label.toLowerCase()} consumed out of ${max}g daily goal`}>
          <span className="font-medium text-gray-700 dark:text-gray-300 cursor-help">{label}</span>
        </Tooltip>
        <span className="text-gray-500 dark:text-gray-400">
          {value} / {max}{unit}
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-spotify-base rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}