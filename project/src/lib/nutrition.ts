import { supabase } from './supabase';
import { NutritionGoal } from '../types/nutrition';

export async function getNutritionGoal(): Promise<NutritionGoal | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('nutrition_goals')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) throw error;
  return data ? {
    ...data,
    dailyCalories: data.daily_calories,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  } : null;
}

export async function updateNutritionGoal(goal: Partial<NutritionGoal>): Promise<NutritionGoal> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const goalData = {
    user_id: user.id,
    daily_calories: goal.dailyCalories,
    protein: goal.protein,
    carbs: goal.carbs,
    fat: goal.fat,
    updated_at: new Date().toISOString()
  };

  // First try to update existing record
  const { data: existingData, error: selectError } = await supabase
    .from('nutrition_goals')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (selectError) throw selectError;

  let result;
  if (existingData) {
    // Update existing record
    const { data, error } = await supabase
      .from('nutrition_goals')
      .update(goalData)
      .eq('id', existingData.id)
      .select()
      .single();
    
    if (error) throw error;
    result = data;
  } else {
    // Insert new record
    const { data, error } = await supabase
      .from('nutrition_goals')
      .insert([goalData])
      .select()
      .single();
    
    if (error) throw error;
    result = data;
  }

  return {
    ...result,
    dailyCalories: result.daily_calories,
    userId: result.user_id,
    createdAt: new Date(result.created_at),
    updatedAt: new Date(result.updated_at)
  };
}