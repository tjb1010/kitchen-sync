import React from 'react';
import { ShoppingItem } from '../../types/shopping';
import { categoryNames, categoryIcons } from '../../utils/itemCategories';
import { ShoppingListItem } from './ShoppingListItem';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<Pick<ShoppingItem, 'name' | 'quantity' | 'unit' | 'description' | 'completed' | 'category'>>) => void;
}

export function ShoppingList({ items, onToggleComplete, onRemoveItem, onUpdateItem }: ShoppingListProps) {
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  // Sort categories by their display names
  const sortedCategories = Object.keys(groupedItems).sort((a, b) => 
    categoryNames[a as keyof typeof categoryNames].localeCompare(
      categoryNames[b as keyof typeof categoryNames]
    )
  );

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Your shopping list is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-right text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">{completedCount}/{totalCount}</span> items completed
      </div>
      {sortedCategories.map(category => (
        <div key={category} className="bg-white dark:bg-spotify-base rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center space-x-2">
            <span>{categoryIcons[category as keyof typeof categoryIcons]}</span>
            <span>{categoryNames[category as keyof typeof categoryNames]}</span>
          </h3>
          <div className="space-y-2">
            {groupedItems[category].map(item => (
              <ShoppingListItem
                key={item.id}
                item={item}
                onToggleComplete={onToggleComplete}
                onRemove={onRemoveItem}
                onUpdate={onUpdateItem}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}