import React from 'react';
import { Activity } from 'lucide-react';
import { useNutrition } from '../../hooks/useNutrition';
import { useNutritionProfile } from '../../hooks/useNutritionProfile';
import { NutritionGoalCard } from './NutritionGoalCard';
import { NutritionProfileForm } from './NutritionProfileForm';
import { EditableNutritionProfile } from './EditableNutritionProfile';
import { PageHeader } from '../PageHeader';

export function NutritionView() {
  const { goal, loading: goalLoading, error: goalError, updateGoal } = useNutrition();
  const { profile, loading: profileLoading, error: profileError, updateProfile } = useNutritionProfile();

  const loading = goalLoading || profileLoading;
  const error = goalError || profileError;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading nutrition data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/50 p-4 rounded-md">
        <div className="text-red-700 dark:text-red-200">Error: {error.message}</div>
      </div>
    );
  }

  // Show the form if there's no profile yet
  if (!profile) {
    return (
      <div className="space-y-6">
        <PageHeader
          icon={Activity}
          title="Nutrition"
          tagline="Track your nutrition goals and progress"
        />

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Set Up Your Profile</h3>
          <NutritionProfileForm
            onSubmit={async (profileData, goalData) => {
              await updateProfile(profileData);
              await updateGoal(goalData);
            }}
            onCancel={() => {}} // No cancel option for initial setup
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Activity}
        title="Nutrition"
        tagline="Track your nutrition goals and progress"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <EditableNutritionProfile 
          profile={profile} 
          onUpdate={async (profileData, goalData) => {
            if (Object.keys(profileData).length > 0) {
              await updateProfile(profileData);
            }
            if (Object.keys(goalData).length > 0) {
              await updateGoal(goalData);
            }
          }}
        />
        {goal && <NutritionGoalCard goal={goal} />}
      </div>
    </div>
  );
}