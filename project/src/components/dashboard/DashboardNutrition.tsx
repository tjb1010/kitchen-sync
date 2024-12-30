import React, { useCallback } from 'react';
import { Activity } from 'lucide-react';
import { useNutrition } from '../../hooks/useNutrition';
import { Link, useNavigate } from 'react-router-dom';
import { MacroProgressBar } from '../nutrition/MacroProgressBar';

export function DashboardNutrition() {
  const { goal } = useNutrition();
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate('/nutrition');
  }, [navigate]);

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nutrition Goals</h3>
        </div>
        <span className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
          View all
        </span>
      </div>

      {goal ? (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {goal.dailyCalories}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Daily Calories</div>
          </div>

          <div className="space-y-3">
            <MacroProgressBar
              label="Protein"
              value={0}
              max={goal.protein}
              unit="g"
              color="bg-blue-500 dark:bg-blue-600"
            />
            <MacroProgressBar
              label="Carbs"
              value={0}
              max={goal.carbs}
              unit="g"
              color="bg-green-500 dark:bg-green-600"
            />
            <MacroProgressBar
              label="Fat"
              value={0}
              max={goal.fat}
              unit="g"
              color="bg-yellow-500 dark:bg-yellow-600"
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          No nutrition goals set
        </div>
      )}
    </div>
  );
}