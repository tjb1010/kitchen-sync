/*
  # Update shopping categories constraint

  Updates the valid_category constraint to include the 'outdoor' category
  for shopping items.
*/

-- First drop the existing constraint
ALTER TABLE shopping_items
DROP CONSTRAINT valid_category;

-- Then recreate it with the updated categories
ALTER TABLE shopping_items
ADD CONSTRAINT valid_category CHECK (
  category IN (
    'produce', 'dairy', 'meat', 'pantry', 
    'frozen', 'beverages', 'household', 'toiletries',
    'baby', 'pet', 'clothing', 'electronics', 'nutrition',
    'outdoor', 'other'
  )
);