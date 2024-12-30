import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface QuickAddTaskProps {
  onAdd: (title: string) => Promise<void>;
  placeholder?: string;
}

export function QuickAddTask({ onAdd, placeholder = "Add new task..." }: QuickAddTaskProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onAdd(title.trim());
      setTitle('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-full px-4 py-2 bg-spotify-base border border-spotify-divider focus:border-spotify-green focus:ring-spotify-green text-spotify-lightest"
      />
      <button
        type="submit"
        disabled={!title.trim() || isSubmitting}
        className="p-2 text-spotify-light hover:text-spotify-green disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
      >
        <Plus className="h-5 w-5" />
      </button>
    </form>
  );
}