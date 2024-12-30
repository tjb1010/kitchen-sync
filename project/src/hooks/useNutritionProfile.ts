import { useState, useEffect } from 'react';
import { NutritionProfile } from '../types/nutrition';
import { getNutritionProfile, updateNutritionProfile } from '../lib/nutritionProfile';

export function useNutritionProfile() {
  const [profile, setProfile] = useState<NutritionProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const data = await getNutritionProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load nutrition profile'));
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(newProfile: Partial<NutritionProfile>) {
    try {
      const updated = await updateNutritionProfile(newProfile);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update nutrition profile'));
      throw err;
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile: loadProfile
  };
}