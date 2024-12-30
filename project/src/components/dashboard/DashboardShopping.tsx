import React, { useCallback } from 'react';
import { ShoppingBasket } from 'lucide-react';
import { useShoppingList } from '../../hooks/useShoppingList';
import { Link, useNavigate } from 'react-router-dom';
import { categoryIcons } from '../../utils/itemCategories';

export function DashboardShopping() {
  const { items } = useShoppingList();
  const navigate = useNavigate();
  const pendingItems = items.filter(item => !item.completed);

  const handleCardClick = useCallback(() => {
    navigate('/shopping');
  }, [navigate]);

  // Group items by category
  const groupedItems = pendingItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ShoppingBasket className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Shopping List</h3>
        </div>
        <span className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
          View all
        </span>
      </div>

      {pendingItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span>{categoryIcons[category as keyof typeof categoryIcons]}</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <ul className="space-y-1">
                {items.slice(0, 3).map(item => (
                  <li key={item.id} className="text-sm text-gray-600 dark:text-gray-300">
                    {item.quantity > 1
                      ? `${item.quantity} ${item.unit ? item.unit + ' ' : ''}${item.name}`
                      : `${item.name}${item.unit ? ' ' + item.unit : ''}`}
                  </li>
                ))}
                {items.length > 3 && (
                  <li className="text-sm text-gray-500 dark:text-gray-400">
                    +{items.length - 3} more...
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">Shopping list is empty</p>
      )}
    </div>
  );
}