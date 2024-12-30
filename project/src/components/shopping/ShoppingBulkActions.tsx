import React from 'react';
import { Trash2, CheckSquare, XSquare } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

interface ShoppingBulkActionsProps {
  onClearCompleted: () => void;
  onClearAll: () => void;
  hasCompletedItems: boolean;
  hasItems: boolean;
}

export function ShoppingBulkActions({
  onClearCompleted,
  onClearAll,
  hasCompletedItems,
  hasItems
}: ShoppingBulkActionsProps) {
  return (
    <div className="flex justify-end space-x-2">
      <Tooltip content="Remove completed items">
        <button
          onClick={onClearCompleted}
          disabled={!hasCompletedItems}
          className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-spotify-light hover:text-spotify-lightest disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <CheckSquare className="h-4 w-4" />
          <span>Clear Completed</span>
        </button>
      </Tooltip>
      <Tooltip content="Remove all items">
        <button
          onClick={onClearAll}
          disabled={!hasItems}
          className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear All</span>
        </button>
      </Tooltip>
    </div>
  );
}