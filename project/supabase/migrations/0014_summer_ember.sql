/*
  # Remove description from shopping items

  1. Changes
    - Remove description column from shopping_items table
*/

ALTER TABLE shopping_items DROP COLUMN IF EXISTS description;