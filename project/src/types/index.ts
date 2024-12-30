export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  servings: number;
  prepTime: number;
  cookTime: number;
  calories: number;
  image?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  category: string;
}

export interface PantryItem {
  id: string;
  ingredientId: string;
  amount: number;
  unit: string;
  expirationDate: Date;
  purchaseDate: Date;
}

export interface MealLog {
  id: string;
  userId: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  items: {
    recipeId?: string;
    ingredientId?: string;
    servings: number;
  }[];
  totalCalories: number;
}