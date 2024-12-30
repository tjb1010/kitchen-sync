import { useState, useEffect } from 'react';
import { NutritionGoal, NutritionProfile } from '../types/nutrition';
import { getNutritionGoal, updateNutritionGoal } from '../lib/nutrition';
import { calculateSuggestedGoals } from '../lib/nutritionCalculations';

export function useNutrition() {
  const [goal, setGoal] = useState<NutritionGoal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadNutritionGoal();
  }, []);

  async function loadNutritionGoal() {
    try {
      setLoading(true);
      const data = await getNutritionGoal();
      setGoal(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load nutrition goal'));
    } finally {
      setLoading(false);
    }
  }

  async function updateGoal(newGoal: Partial<NutritionGoal>) {
    try {
      const updated = await updateNutritionGoal(newGoal);
      setGoal(updated); // Immediately update local state
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update nutrition goal'));
      throw err;
    }
  }

  async function getSuggestedGoals(profile: NutritionProfile) {
    try {
      return calculateSuggestedGoals(profile);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to calculate suggested goals'));
      throw err;
    }
  }

  return {
    goal,
    loading,
    error,
    updateGoal,
    getSuggestedGoals,
    refreshGoal: loadNutritionGoal
  };
}