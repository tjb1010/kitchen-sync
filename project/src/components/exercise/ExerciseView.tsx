import React from 'react';
import { Dumbbell } from 'lucide-react';
import { PageHeader } from '../PageHeader';

export function ExerciseView() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Dumbbell}
        title="Exercise"
        tagline="Plan and track your workouts"
      />
      <div className="bg-white dark:bg-spotify-base rounded-lg p-6">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Exercise and workout planning features coming soon!
        </p>
      </div>
    </div>
  );
}