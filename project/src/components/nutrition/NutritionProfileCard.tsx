import React from 'react';
import { Edit2 } from 'lucide-react';
import { NutritionProfile } from '../../types/nutrition';
import { kgToLbs, cmToFeet } from '../../utils/units';

interface NutritionProfileCardProps {
  profile: NutritionProfile;
  onEdit: () => void;
}

export function NutritionProfileCard({ profile, onEdit }: NutritionProfileCardProps) {
  const displayWeight = profile.unitSystem === 'imperial' 
    ? `${Math.round(kgToLbs(profile.weight))} lbs`
    : `${profile.weight} kg`;

  const displayHeight = profile.unitSystem === 'imperial'
    ? (() => {
        const { feet, inches } = cmToFeet(profile.height);
        return `${feet}'${inches}"`;
      })()
    : `${profile.height} cm`;

  const activityLevels = {
    sedentary: 'Sedentary (little or no exercise)',
    light: 'Light (exercise 1-3 times/week)',
    moderate: 'Moderate (exercise 3-5 times/week)',
    very: 'Very Active (exercise 6-7 times/week)',
    extra: 'Extra Active (very intense exercise daily)'
  };

  const goals = {
    maintain: 'Maintain Weight',
    lose: 'Lose Weight',
    gain: 'Gain Weight'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Profile</h3>
        <button
          onClick={onEdit}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <Edit2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{profile.age} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
            <p className="font-medium text-gray-900 dark:text-gray-100 capitalize">{profile.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{displayWeight}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{displayHeight}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Activity Level</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">{activityLevels[profile.activityLevel]}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Goal</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">{goals[profile.goal]}</p>
        </div>
      </div>
    </div>
  );
}