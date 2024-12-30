export type ItemCategory = 
  | 'produce'
  | 'dairy'
  | 'meat'
  | 'pantry'
  | 'frozen'
  | 'beverages'
  | 'household'
  | 'toiletries'
  | 'baby'
  | 'pet'
  | 'clothing'
  | 'electronics'
  | 'nutrition'
  | 'outdoor'
  | 'other';

export interface ShoppingItem {
  id: string;
  name: string;
  category: ItemCategory;
  quantity: number;
  unit?: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShoppingItemData {
  name: string;
  quantity: number;
  unit?: string;
}