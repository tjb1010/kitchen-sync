-- Update valid_category constraint with new categories
ALTER TABLE shopping_items
DROP CONSTRAINT valid_category;

ALTER TABLE shopping_items
ADD CONSTRAINT valid_category CHECK (
  category IN (
    'produce', 'dairy', 'meat', 'pantry', 
    'frozen', 'beverages', 'household', 'toiletries',
    'baby', 'pet', 'clothing', 'electronics', 'nutrition',
    'other'
  )
);