import React from 'react';
import { ChefHat } from 'lucide-react';
import { PageHeader } from '../PageHeader';

export function RecipesView() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={ChefHat}
        title="Recipes"
        tagline="Discover, create, and manage your recipes"
      />
      <div className="bg-white dark:bg-spotify-base rounded-lg p-6">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Recipe management features coming soon!
        </p>
      </div>
    </div>
  );
}