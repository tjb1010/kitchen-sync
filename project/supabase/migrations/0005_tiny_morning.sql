/*
  # Add unit system to nutrition profiles

  1. Changes
    - Add unit_system column to nutrition_profiles table
    - Set default value to 'metric'
    - Add check constraint for valid values
*/

ALTER TABLE nutrition_profiles
ADD COLUMN unit_system text NOT NULL DEFAULT 'metric',
ADD CONSTRAINT valid_unit_system CHECK (unit_system IN ('metric', 'imperial'));