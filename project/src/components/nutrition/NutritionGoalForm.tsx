import React, { useState } from 'react';
import { NutritionGoal } from '../../types/nutrition';
import { useNutrition } from '../../hooks/useNutrition';

interface NutritionGoalFormProps {
  initialGoal: NutritionGoal;
  onSubmit: () => void;
  onCancel: () => void;
}

export function NutritionGoalForm({ initialGoal, onSubmit, onCancel }: NutritionGoalFormProps) {
  const { updateGoal } = useNutrition();
  const [formData, setFormData] = useState({
    dailyCalories: initialGoal.dailyCalories,
    protein: initialGoal.protein,
    carbs: initialGoal.carbs,
    fat: initialGoal.fat
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateGoal(formData);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Daily Calories</label>
        <input
          type="number"
          min="1000"
          max="10000"
          required
          value={formData.dailyCalories}
          onChange={(e) => setFormData({ ...formData, dailyCalories: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
          <input
            type="number"
            min="0"
            max="500"
            required
            value={formData.protein}
            onChange={(e) => setFormData({ ...formData, protein: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
          <input
            type="number"
            min="0"
            max="1000"
            required
            value={formData.carbs}
            onChange={(e) => setFormData({ ...formData, carbs: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
          <input
            type="number"
            min="0"
            max="500"
            required
            value={formData.fat}
            onChange={(e) => setFormData({ ...formData, fat: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          Update Goals
        </button>
      </div>
    </form>
  );
}