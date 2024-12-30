import React from 'react';
import { NutritionGoal } from '../../types/nutrition';
import { MacroProgressBar } from './MacroProgressBar';

interface NutritionGoalCardProps {
  goal: NutritionGoal;
}

export function NutritionGoalCard({ goal }: NutritionGoalCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Daily Goals</h3>

      <div className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {goal.dailyCalories}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Daily Calories</div>
        </div>

        <div className="space-y-4">
          <MacroProgressBar
            label="Protein"
            value={0}
            max={goal.protein}
            unit="g"
            color="bg-blue-500"
          />
          <MacroProgressBar
            label="Carbs"
            value={0}
            max={goal.carbs}
            unit="g"
            color="bg-green-500"
          />
          <MacroProgressBar
            label="Fat"
            value={0}
            max={goal.fat}
            unit="g"
            color="bg-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}