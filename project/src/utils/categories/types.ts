import { ItemCategory } from '../../types/shopping';

export type CategoryMapping = Readonly<Record<string, ItemCategory>>;

export const categoryIcons: Record<ItemCategory, string> = {
  produce: '🥬',
  dairy: '🥛',
  meat: '🥩',
  pantry: '🥫',
  frozen: '❄️',
  beverages: '🥤',
  household: '🏠',
  toiletries: '🧴',
  baby: '👶',
  pet: '🐾',
  clothing: '👕',
  electronics: '🔌',
  nutrition: '💪',
  outdoor: '🌿',
  other: '📦'
};

export const categoryNames: Record<ItemCategory, string> = {
  produce: 'Produce',
  dairy: 'Dairy',
  meat: 'Meat & Seafood',
  pantry: 'Pantry',
  frozen: 'Frozen',
  beverages: 'Beverages',
  household: 'Household',
  toiletries: 'Toiletries',
  baby: 'Baby',
  pet: 'Pet Supplies',
  clothing: 'Clothing',
  electronics: 'Electronics',
  nutrition: 'Nutrition & Supplements',
  outdoor: 'Outdoor & Garden',
  other: 'Other'
};