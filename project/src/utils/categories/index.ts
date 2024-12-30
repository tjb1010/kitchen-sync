import { ItemCategory } from '../../types/shopping';
import { CategoryMapping, categoryIcons, categoryNames } from './types';
import { produceItems, dairyItems, meatItems, pantryItems, frozenItems } from './mappings/food';
import { beverageItems } from './mappings/beverages';
import { householdItems, toiletriesItems } from './mappings/household';
import { babyItems, petItems } from './mappings/specialty';
import { clothingItems, electronicsItems } from './mappings/general';
import { outdoorItems } from './mappings/outdoor';
import { nutritionItems } from './mappings/nutrition';

// Combine all category mappings
const itemCategoryMap: CategoryMapping = {
  ...produceItems,
  ...dairyItems,
  ...meatItems,
  ...pantryItems,
  ...frozenItems,
  ...beverageItems,
  ...householdItems,
  ...toiletriesItems,
  ...babyItems,
  ...petItems,
  ...clothingItems,
  ...electronicsItems,
  ...nutritionItems,
  ...outdoorItems
};

export function categorizeItem(itemName: string): ItemCategory {
  const normalizedName = itemName.toLowerCase().trim();
  
  // Check for exact matches
  if (itemCategoryMap[normalizedName]) {
    return itemCategoryMap[normalizedName];
  }

  // Check for partial matches
  for (const [key, category] of Object.entries(itemCategoryMap)) {
    if (normalizedName.includes(key)) {
      return category;
    }
  }

  return 'other';
}

export { categoryIcons, categoryNames };