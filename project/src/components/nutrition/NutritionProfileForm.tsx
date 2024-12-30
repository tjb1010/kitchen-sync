import React, { useState } from 'react';
import { NutritionProfile, NutritionGoal } from '../../types/nutrition';
import { UnitSystemToggle } from './UnitSystemToggle';
import { MetricMeasurements } from './MetricMeasurements';
import { ImperialMeasurements } from './ImperialMeasurements';
import { kgToLbs, lbsToKg, cmToFeet, feetInchesToCm } from '../../utils/units';
import { calculateSuggestedGoals } from '../../lib/nutritionCalculations';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';

const defaultProfile: Partial<NutritionProfile> = {
  age: 30,
  gender: 'other',
  weight: 70,
  height: 170,
  activityLevel: 'moderate',
  goal: 'maintain',
  unitSystem: 'metric'
};

interface NutritionProfileFormProps {
  initialProfile?: NutritionProfile;
  onSubmit: (profile: Partial<NutritionProfile>, goal: Partial<NutritionGoal>) => Promise<void>;
  onCancel: () => void;
}

export function NutritionProfileForm({ 
  initialProfile,
  onSubmit,
  onCancel 
}: NutritionProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const profile = initialProfile || defaultProfile;

  const [formData, setFormData] = useState({
    age: profile.age || defaultProfile.age,
    gender: profile.gender || defaultProfile.gender,
    weight: profile.weight || defaultProfile.weight,
    weightLbs: profile.weight ? kgToLbs(profile.weight) : kgToLbs(defaultProfile.weight!),
    height: profile.height || defaultProfile.height,
    feet: profile.height ? Math.floor(cmToFeet(profile.height).feet) : Math.floor(cmToFeet(defaultProfile.height!).feet),
    inches: profile.height ? cmToFeet(profile.height).inches : cmToFeet(defaultProfile.height!).inches,
    activityLevel: profile.activityLevel || defaultProfile.activityLevel,
    goal: profile.goal || defaultProfile.goal,
    unitSystem: profile.unitSystem || defaultProfile.unitSystem
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    
    try {
      setIsSubmitting(true);

      const weight = formData.unitSystem === 'imperial' 
        ? lbsToKg(formData.weightLbs) 
        : formData.weight;
      const height = formData.unitSystem === 'imperial'
        ? feetInchesToCm(formData.feet, formData.inches)
        : formData.height;

      const profileData = {
        age: formData.age,
        gender: formData.gender as NutritionProfile['gender'],
        weight,
        height,
        unitSystem: formData.unitSystem,
        activityLevel: formData.activityLevel as NutritionProfile['activityLevel'],
        goal: formData.goal as NutritionProfile['goal']
      };

      const goals = calculateSuggestedGoals({
        ...profileData,
        id: initialProfile?.id || '',
        userId: initialProfile?.userId || '',
        createdAt: initialProfile?.createdAt || new Date(),
        updatedAt: initialProfile?.updatedAt || new Date()
      });

      await onSubmit(profileData, goals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
          <div className="text-sm text-red-700 dark:text-red-200">{error}</div>
        </div>
      )}

      <UnitSystemToggle 
        unitSystem={formData.unitSystem} 
        onUnitSystemChange={(system) => setFormData({ ...formData, unitSystem: system })}
      />

      {formData.unitSystem === 'metric' ? (
        <MetricMeasurements
          weight={formData.weight}
          height={formData.height}
          onWeightChange={(weight) => setFormData({ ...formData, weight })}
          onHeightChange={(height) => setFormData({ ...formData, height })}
        />
      ) : (
        <ImperialMeasurements
          weightLbs={formData.weightLbs}
          feet={formData.feet}
          inches={formData.inches}
          onWeightChange={(weightLbs) => setFormData({ ...formData, weightLbs })}
          onFeetChange={(feet) => setFormData({ ...formData, feet })}
          onInchesChange={(inches) => setFormData({ ...formData, inches })}
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Age"
          type="number"
          min={1}
          max={120}
          required
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
        />

        <FormSelect
          label="Gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value as NutritionProfile['gender'] })}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]}
        />
      </div>

      <FormSelect
        label="Activity Level"
        value={formData.activityLevel}
        onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as NutritionProfile['activityLevel'] })}
        options={[
          { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
          { value: 'light', label: 'Light (exercise 1-3 times/week)' },
          { value: 'moderate', label: 'Moderate (exercise 3-5 times/week)' },
          { value: 'very', label: 'Very Active (exercise 6-7 times/week)' },
          { value: 'extra', label: 'Extra Active (very intense exercise daily)' }
        ]}
      />

      <FormSelect
        label="Goal"
        value={formData.goal}
        onChange={(e) => setFormData({ ...formData, goal: e.target.value as NutritionProfile['goal'] })}
        options={[
          { value: 'maintain', label: 'Maintain Weight' },
          { value: 'lose', label: 'Lose Weight' },
          { value: 'gain', label: 'Gain Weight' }
        ]}
      />

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
}