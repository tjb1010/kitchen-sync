import React, { useState } from 'react';
import { NutritionProfile, NutritionGoal } from '../../types/nutrition';
import { NutritionProfileCard } from './NutritionProfileCard';
import { NutritionProfileForm } from './NutritionProfileForm';

interface EditableNutritionProfileProps {
  profile: NutritionProfile;
  onUpdate: (profile: Partial<NutritionProfile>, goal: Partial<NutritionGoal>) => Promise<void>;
}

export function EditableNutritionProfile({ 
  profile,
  onUpdate
}: EditableNutritionProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Edit Profile</h3>
        <NutritionProfileForm
          initialProfile={profile}
          onSubmit={async (profileData, goalData) => {
            await onUpdate(profileData, goalData);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <NutritionProfileCard 
      profile={profile} 
      onEdit={() => setIsEditing(true)}
    />
  );
}