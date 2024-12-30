import React, { useCallback } from 'react';
import { ClipboardList } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { Link, useNavigate } from 'react-router-dom';

export function DashboardTasks() {
  const { tasks } = useTasks();
  const navigate = useNavigate();

  const recentTasks = tasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.getTime() - b.dueDate.getTime();
    })
    .slice(0, 5);

  const handleCardClick = useCallback(() => {
    navigate('/tasks');
  }, [navigate]);

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ClipboardList className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tasks</h3>
        </div>
        <span className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
          View all
        </span>
      </div>

      <div className="space-y-3">
        {recentTasks.map(task => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">{task.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : 'No due date'}
              </p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              task.priority === 'high'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
            }`}>
              {task.priority}
            </span>
          </div>
        ))}

        {recentTasks.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">No pending tasks</p>
        )}
      </div>
    </div>
  );
}