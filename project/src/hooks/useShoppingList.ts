import { useState, useEffect } from 'react';
import { ShoppingItem, CreateShoppingItemData } from '../types/shopping';
import { getShoppingList, createShoppingItem, updateShoppingItem, deleteShoppingItem } from '../lib/shopping';

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      setLoading(true);
      const data = await getShoppingList();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load shopping list'));
    } finally {
      setLoading(false);
    }
  }

  async function addItem(itemData: CreateShoppingItemData) {
    try {
      const newItem = await createShoppingItem(itemData);
      setItems(current => [newItem, ...current]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add item'));
      throw err;
    }
  }

  async function toggleItemComplete(id: string, completed: boolean) {
    try {
      const updatedItem = await updateShoppingItem(id, { completed });
      setItems(current =>
        current.map(item => (item.id === id ? updatedItem : item))
      );
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update item'));
      throw err;
    }
  }

  async function removeItem(id: string) {
    try {
      await deleteShoppingItem(id);
      setItems(current => current.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete item'));
      throw err;
    }
  }

  return {
    items,
    loading,
    error,
    addItem,
    toggleItemComplete,
    removeItem,
    refreshItems: loadItems
  };
}