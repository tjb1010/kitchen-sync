/*
  # Add Shopping List Feature

  1. New Tables
    - `shopping_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `category` (text)
      - `quantity` (numeric)
      - `unit` (text, optional)
      - `completed` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `shopping_items` table
    - Add policies for authenticated users to manage their own items
*/

-- Create shopping_items table
CREATE TABLE shopping_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  quantity numeric NOT NULL DEFAULT 1,
  unit text,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Add constraints
  CONSTRAINT positive_quantity CHECK (quantity > 0),
  CONSTRAINT valid_category CHECK (
    category IN (
      'produce', 'dairy', 'meat', 'pantry', 
      'frozen', 'beverages', 'household', 'other'
    )
  )
);

-- Enable RLS
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own shopping items"
  ON shopping_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own shopping items"
  ON shopping_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own shopping items"
  ON shopping_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own shopping items"
  ON shopping_items FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_shopping_items_updated_at
  BEFORE UPDATE ON shopping_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();