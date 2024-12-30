export interface NutritionGoal {
  id: string;
  userId: string;
  dailyCalories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  createdAt: Date;
  updatedAt: Date;
}

export type UnitSystem = 'metric' | 'imperial';

export interface NutritionProfile {
  id: string;
  userId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number; // stored in kg
  height: number; // stored in cm
  unitSystem: UnitSystem;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  goal: 'maintain' | 'lose' | 'gain';
  createdAt: Date;
  updatedAt: Date;
}