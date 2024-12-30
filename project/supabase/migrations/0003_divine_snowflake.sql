/*
  # Add nutrition tracking tables

  1. New Tables
    - `nutrition_goals`: Stores user's daily nutrition goals
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `daily_calories` (integer)
      - `protein` (integer, grams)
      - `carbs` (integer, grams)
      - `fat` (integer, grams)
      - Timestamps

    - `nutrition_profiles`: Stores user's physical characteristics
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `age` (integer)
      - `gender` (enum)
      - `weight` (numeric, kg)
      - `height` (numeric, cm)
      - `activity_level` (enum)
      - `goal` (enum)
      - Timestamps

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create enums
CREATE TYPE user_gender AS ENUM ('male', 'female', 'other');
CREATE TYPE activity_level AS ENUM ('sedentary', 'light', 'moderate', 'very', 'extra');
CREATE TYPE nutrition_goal AS ENUM ('maintain', 'lose', 'gain');

-- Create nutrition_goals table
CREATE TABLE nutrition_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  daily_calories integer NOT NULL,
  protein integer NOT NULL,
  carbs integer NOT NULL,
  fat integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create nutrition_profiles table
CREATE TABLE nutrition_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  age integer NOT NULL,
  gender user_gender NOT NULL,
  weight numeric NOT NULL,
  height numeric NOT NULL,
  activity_level activity_level NOT NULL,
  goal nutrition_goal NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE nutrition_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for nutrition_goals
CREATE POLICY "Users can read own nutrition goals"
  ON nutrition_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own nutrition goals"
  ON nutrition_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own nutrition goals"
  ON nutrition_goals FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for nutrition_profiles
CREATE POLICY "Users can read own nutrition profile"
  ON nutrition_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own nutrition profile"
  ON nutrition_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own nutrition profile"
  ON nutrition_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Create updated_at triggers
CREATE TRIGGER update_nutrition_goals_updated_at
  BEFORE UPDATE ON nutrition_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nutrition_profiles_updated_at
  BEFORE UPDATE ON nutrition_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();