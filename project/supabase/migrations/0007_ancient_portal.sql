/*
  # Add toiletries category to shopping items

  1. Changes
    - Add 'toiletries' as a valid category for shopping items
*/

ALTER TABLE shopping_items
DROP CONSTRAINT valid_category;

ALTER TABLE shopping_items
ADD CONSTRAINT valid_category CHECK (
  category IN (
    'produce', 'dairy', 'meat', 'pantry', 
    'frozen', 'beverages', 'household', 'toiletries', 'other'
  )
);