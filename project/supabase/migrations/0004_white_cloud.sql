/*
  # Add constraints to nutrition goals table

  1. Changes
    - Add check constraints for valid ranges of nutrition values
    - Ensures daily calories are between 500-10000
    - Ensures macronutrients have reasonable limits
*/

-- Add check constraints
ALTER TABLE nutrition_goals
ADD CONSTRAINT daily_calories_range CHECK (daily_calories >= 500 AND daily_calories <= 10000),
ADD CONSTRAINT protein_range CHECK (protein >= 0 AND protein <= 500),
ADD CONSTRAINT carbs_range CHECK (carbs >= 0 AND carbs <= 1000),
ADD CONSTRAINT fat_range CHECK (fat >= 0 AND fat <= 500);