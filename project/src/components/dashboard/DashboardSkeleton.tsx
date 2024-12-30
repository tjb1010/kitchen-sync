import React from 'react';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-24"></div>
        ))}
      </div>

      {/* Tasks and Nutrition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-64"></div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-64"></div>
      </div>

      {/* Shopping List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-48"></div>
    </div>
  );
}