import { NutritionProfile } from '../types/nutrition';

function calculateBMR(profile: NutritionProfile): number {
  // Use the Mifflin-St Jeor Equation for more accurate BMR
  const weightFactor = 10 * profile.weight; // weight in kg
  const heightFactor = 6.25 * profile.height; // height in cm
  const ageFactor = 5 * profile.age;

  if (profile.gender === 'female') {
    return weightFactor + heightFactor - ageFactor - 161;
  } else {
    return weightFactor + heightFactor - ageFactor + 5;
  }
}

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,   // Little or no exercise
  light: 1.375,     // Light exercise 1-3 times/week
  moderate: 1.55,   // Moderate exercise 3-5 times/week
  very: 1.725,      // Hard exercise 6-7 times/week
  extra: 1.9        // Very hard exercise & physical job or training twice per day
} as const;

const GOAL_ADJUSTMENTS = {
  lose: -500,     // Create a 500 calorie deficit
  maintain: 0,    // Maintain current weight
  gain: 500       // Create a 500 calorie surplus
} as const;

export function calculateSuggestedGoals(profile: NutritionProfile) {
  // Calculate Base Metabolic Rate
  const bmr = calculateBMR(profile);
  
  // Calculate Total Daily Energy Expenditure
  const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[profile.activityLevel]);
  
  // Adjust calories based on goal
  const adjustedCalories = tdee + GOAL_ADJUSTMENTS[profile.goal];
  
  // Ensure minimum healthy calories
  const dailyCalories = Math.max(1200, adjustedCalories);

  // Calculate macronutrients
  let protein: number;
  let fat: number;
  let carbs: number;

  switch (profile.goal) {
    case 'lose':
      // Higher protein for muscle preservation during deficit
      protein = profile.weight * 2.2; // 2.2g per kg of body weight
      fat = (dailyCalories * 0.25) / 9; // 25% of calories from fat
      carbs = (dailyCalories - (protein * 4) - (fat * 9)) / 4;
      break;
      
    case 'maintain':
      // Balanced distribution
      protein = profile.weight * 1.8; // 1.8g per kg of body weight
      fat = (dailyCalories * 0.3) / 9; // 30% of calories from fat
      carbs = (dailyCalories - (protein * 4) - (fat * 9)) / 4;
      break;
      
    case 'gain':
      // Higher carbs for muscle gain
      protein = profile.weight * 2.0; // 2.0g per kg of body weight
      fat = (dailyCalories * 0.25) / 9; // 25% of calories from fat
      carbs = (dailyCalories - (protein * 4) - (fat * 9)) / 4;
      break;
  }

  return {
    dailyCalories: Math.round(dailyCalories),
    protein: Math.max(0, Math.round(protein)),
    carbs: Math.max(0, Math.round(carbs)),
    fat: Math.max(0, Math.round(fat))
  };
}