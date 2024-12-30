import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  tagline: string;
}

export function PageHeader({ icon: Icon, title, tagline }: PageHeaderProps) {
  return (
    <div className="flex items-start space-x-4">
      <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tagline}</p>
      </div>
    </div>
  );
}