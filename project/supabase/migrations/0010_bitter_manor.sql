/*
  # Add task groups support
  
  1. New Tables
    - `task_groups`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `description` (text, optional)
      - `color` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Changes
    - Add `group_id` to tasks table
    
  3. Security
    - Enable RLS on task_groups
    - Add policies for CRUD operations
*/

-- Create task_groups table
CREATE TABLE task_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text NOT NULL,
  description text,
  color text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add group_id to tasks
ALTER TABLE tasks
ADD COLUMN group_id uuid REFERENCES task_groups(id);

-- Enable RLS
ALTER TABLE task_groups ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own task groups"
  ON task_groups FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create task groups"
  ON task_groups FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own task groups"
  ON task_groups FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own task groups"
  ON task_groups FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_task_groups_updated_at
  BEFORE UPDATE ON task_groups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();