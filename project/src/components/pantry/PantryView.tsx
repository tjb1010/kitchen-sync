import React from 'react';
import { Package2 } from 'lucide-react';
import { PageHeader } from '../PageHeader';

export function PantryView() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Package2}
        title="Pantry"
        tagline="Track and manage your ingredients"
      />
      <div className="bg-white dark:bg-spotify-base rounded-lg p-6">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Pantry management features coming soon!
        </p>
      </div>
    </div>
  );
}