import React from 'react';
import { Utensils, RefreshCw } from 'lucide-react';

export function Logo() {
  return (
    <div className="relative flex items-center">
      <Utensils className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
      <div className="absolute -right-3 -bottom-3">
        <div className="bg-white dark:bg-gray-800 rounded-full p-0.5">
          <RefreshCw className="h-4 w-4 text-indigo-500 dark:text-indigo-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
}