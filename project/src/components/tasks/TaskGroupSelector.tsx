import React from 'react';
import { FolderPlus, Edit2 } from 'lucide-react';
import { TaskGroup } from '../../types/tasks';
import { Tooltip } from '../ui/Tooltip';

interface TaskGroupSelectorProps {
  groups: TaskGroup[];
  selectedGroupId?: string;
  onSelectGroup: (groupId?: string) => void;
  onCreateGroup: () => void;
  onEditGroup: (group: TaskGroup) => void;
}

export function TaskGroupSelector({
  groups,
  selectedGroupId,
  onSelectGroup,
  onCreateGroup,
  onEditGroup
}: TaskGroupSelectorProps) {
  return (
    <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
      <button
        onClick={() => onSelectGroup(undefined)}
        className={`px-4 py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${
          !selectedGroupId
            ? 'bg-spotify-green text-black'
            : 'text-spotify-light hover:text-spotify-lightest'
        }`}
      >
        All Tasks
      </button>
      
      {groups.map(group => (
        <div key={group.id} className="flex items-center space-x-1">
          <button
            onClick={() => onSelectGroup(group.id)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${
              selectedGroupId === group.id
                ? 'bg-spotify-green text-black'
                : 'text-spotify-light hover:text-spotify-lightest'
            }`}
            style={selectedGroupId === group.id ? undefined : { color: group.color }}
          >
            {group.name}
          </button>
          <Tooltip content="Edit group">
            <button
              onClick={() => onEditGroup(group)}
              className="p-1 rounded-full text-spotify-light hover:text-spotify-green transition-colors duration-200"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>
      ))}

      <Tooltip content="Create new task group">
        <button
          onClick={onCreateGroup}
          className="p-2 rounded-full text-spotify-light hover:text-spotify-green transition-colors duration-200"
        >
          <FolderPlus className="h-5 w-5" />
        </button>
      </Tooltip>
    </div>
  );
}