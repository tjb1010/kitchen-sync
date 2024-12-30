import { supabase } from './supabase';
import { NutritionProfile } from '../types/nutrition';

export async function getNutritionProfile(): Promise<NutritionProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('nutrition_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) throw error;
  
  return data ? {
    ...data,
    userId: data.user_id,
    unitSystem: data.unit_system || 'metric',
    activityLevel: data.activity_level,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  } : null;
}

export async function updateNutritionProfile(profile: Partial<NutritionProfile>): Promise<NutritionProfile> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const profileData = {
    user_id: user.id,
    age: profile.age,
    gender: profile.gender,
    weight: profile.weight,
    height: profile.height,
    unit_system: profile.unitSystem,
    activity_level: profile.activityLevel,
    goal: profile.goal,
    updated_at: new Date().toISOString()
  };

  // First try to update existing record
  const { data: existingData, error: selectError } = await supabase
    .from('nutrition_profiles')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (selectError) throw selectError;

  let result;
  if (existingData) {
    const { data, error } = await supabase
      .from('nutrition_profiles')
      .update(profileData)
      .eq('id', existingData.id)
      .select()
      .single();
    
    if (error) throw error;
    result = data;
  } else {
    const { data, error } = await supabase
      .from('nutrition_profiles')
      .insert([profileData])
      .select()
      .single();
    
    if (error) throw error;
    result = data;
  }

  return {
    ...result,
    userId: result.user_id,
    unitSystem: result.unit_system || 'metric',
    activityLevel: result.activity_level,
    createdAt: new Date(result.created_at),
    updatedAt: new Date(result.updated_at)
  };
}