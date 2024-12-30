import React from 'react';
import { Clock, Edit2, MessageSquare } from 'lucide-react';
import { Task } from '../../types/tasks';
import { useSettings } from '../../hooks/useSettings';
import { DateService } from '../../services/dateService';
import { getDueDateStatus } from '../../utils/taskStatus';
import { Tooltip } from '../ui/Tooltip';
import { useState } from 'react';
import { TaskComments } from './TaskComments';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Task['status']) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onStatusChange, onEdit }: TaskCardProps) {
  const { settings } = useSettings();
  const [showComments, setShowComments] = useState(false);
  const timezone = settings?.timezone || 'UTC';
  
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);
  const dueDateColors = {
    overdue: 'text-red-600 dark:text-red-400',
    dueToday: 'text-yellow-600 dark:text-yellow-400',
    upcoming: 'text-gray-500 dark:text-gray-400',
    none: 'text-gray-500 dark:text-gray-400'
  };

  return (
    <div className="card-spotify p-4 group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.title}</h3>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-sm ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <Tooltip content="Toggle comments">
            <button
              onClick={() => setShowComments(!showComments)}
              className="p-1 hover:bg-spotify-hover rounded-full transition-colors duration-200"
            >
              <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-spotify-green transition-colors duration-200" />
            </button>
          </Tooltip>
          <Tooltip content="Edit task">
            <button
              onClick={() => onEdit(task)}
              className="p-1 hover:bg-spotify-hover rounded-full transition-colors duration-200"
            >
              <Edit2 className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-spotify-green transition-colors duration-200" />
            </button>
          </Tooltip>
        </div>
      </div>
      
      {task.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Clock className={`h-4 w-4 ${dueDateColors[dueDateStatus]}`} />
          <span className={`text-sm ${dueDateColors[dueDateStatus]}`}>
            {task.dueDate ? DateService.formatForDisplay(task.dueDate, timezone) : 'No due date'}
          </span>
        </div>
        
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
          className="text-sm border rounded-md px-2 py-1 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      {showComments && (
        <div className="mt-4 pt-4 border-t border-spotify-divider">
          <TaskComments taskId={task.id} />
        </div>
      )}
    </div>
  );
}