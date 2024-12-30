import { supabase } from './supabase';
import { ShoppingItem, CreateShoppingItemData } from '../types/shopping';
import { categorizeItem } from '../utils/itemCategories';

export async function getShoppingList(): Promise<ShoppingItem[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('shopping_items')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(item => ({
    ...item,
    userId: item.user_id,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at)
  }));
}

export async function createShoppingItem(itemData: CreateShoppingItemData): Promise<ShoppingItem> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const category = categorizeItem(itemData.name);

  const { data, error } = await supabase
    .from('shopping_items')
    .insert([{
      user_id: user.id,
      name: itemData.name,
      category,
      quantity: itemData.quantity,
      unit: itemData.unit || null,
      completed: false
    }])
    .select()
    .single();

  if (error) throw error;

  return {
    ...data,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  };
}

export async function updateShoppingItem(
  id: string, 
  updates: Partial<Pick<ShoppingItem, 'name' | 'quantity' | 'unit' | 'completed' | 'category'>>
): Promise<ShoppingItem> {
  const { data, error } = await supabase
    .from('shopping_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return {
    ...data,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  };
}

export async function deleteShoppingItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('shopping_items')
    .delete()
    .eq('id', id);

  if (error) throw error;
}