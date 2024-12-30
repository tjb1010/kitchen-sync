import React, { useState } from 'react';
import { TaskGroup } from '../../types/tasks';

interface TaskGroupFormProps {
  onSubmit: (name: string, description: string, color: string) => Promise<void>;
  onCancel: () => void;
  initialGroup?: TaskGroup;
}

export function TaskGroupForm({ onSubmit, onCancel, initialGroup }: TaskGroupFormProps) {
  const [formData, setFormData] = useState({
    name: initialGroup?.name || '',
    description: initialGroup?.description || '',
    color: initialGroup?.color || '#1DB954'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData.name, formData.description, formData.color);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Group Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-spotify-green focus:ring-spotify-green"
          placeholder="e.g., Work Projects, Home Tasks"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description (optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-spotify-green focus:ring-spotify-green"
          rows={3}
          placeholder="Add a description for this task group"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Color
        </label>
        <input
          type="color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="mt-1 block w-full h-10 rounded-md border-gray-300 dark:border-gray-600 cursor-pointer"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-spotify"
        >
          {initialGroup ? 'Update Group' : 'Create Group'}
        </button>
      </div>
    </form>
  );
}