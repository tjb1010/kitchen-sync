import React, { useState } from 'react';
import { ShoppingBasket, Plus } from 'lucide-react';
import { useShoppingList } from '../../hooks/useShoppingList';
import { ShoppingList } from './ShoppingList';
import { QuickAddItem } from './QuickAddItem';
import { PageHeader } from '../PageHeader';
import { ShoppingBulkActions } from './ShoppingBulkActions';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { UndoToast } from '../ui/UndoToast';
import { ShoppingItem } from '../../types/shopping';

export function ShoppingView() {
  const { items, loading, error, addItem, toggleItemComplete, removeItem, updateItem } = useShoppingList();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showConfirmClearCompleted, setShowConfirmClearCompleted] = useState(false);
  const [deletedItems, setDeletedItems] = useState<ShoppingItem[]>([]);
  const [showUndoToast, setShowUndoToast] = useState(false);

  const handleClearAll = () => {
    setShowConfirmClear(true);
  };

  const handleClearCompleted = () => {
    setShowConfirmClearCompleted(true);
  };

  const confirmClearAll = () => {
    setDeletedItems(items);
    items.forEach(item => removeItem(item.id));
    setShowConfirmClear(false);
    setShowUndoToast(true);
  };

  const confirmClearCompleted = () => {
    const completedItems = items.filter(item => item.completed);
    setDeletedItems(completedItems);
    completedItems.forEach(item => removeItem(item.id));
    setShowConfirmClearCompleted(false);
    setShowUndoToast(true);
  };

  const handleUndo = async () => {
    for (const item of deletedItems) {
      await addItem({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        description: item.description
      });
    }
    setShowUndoToast(false);
    setDeletedItems([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading shopping list...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/50 p-4 rounded-md">
        <div className="text-red-700 dark:text-red-200">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          icon={ShoppingBasket}
          title="Shopping List"
          tagline="Keep track of everything you need to buy"
        />
      </div>

      <div className="flex justify-between items-center">
        <QuickAddItem onAdd={addItem} />
        <ShoppingBulkActions
          onClearCompleted={handleClearCompleted}
          onClearAll={handleClearAll}
          hasCompletedItems={items.some(item => item.completed)}
          hasItems={items.length > 0}
        />
      </div>

      <ShoppingList
        items={items}
        onToggleComplete={toggleItemComplete}
        onRemoveItem={removeItem}
        onUpdateItem={updateItem}
      />

      {showConfirmClear && (
        <ConfirmDialog
          title="Clear Shopping List"
          message="Are you sure you want to clear the entire shopping list? This action cannot be undone."
          confirmLabel="Clear All"
          onConfirm={confirmClearAll}
          onCancel={() => setShowConfirmClear(false)}
          isDestructive
        />
      )}

      {showConfirmClearCompleted && (
        <ConfirmDialog
          title="Clear Completed Items"
          message="Are you sure you want to remove all completed items from the list?"
          confirmLabel="Clear Completed"
          onConfirm={confirmClearCompleted}
          onCancel={() => setShowConfirmClearCompleted(false)}
          isDestructive
        />
      )}

      {showUndoToast && (
        <UndoToast
          message={`Removed ${deletedItems.length} item${deletedItems.length === 1 ? '' : 's'}`}
          onUndo={handleUndo}
          onClose={() => {
            setShowUndoToast(false);
            setDeletedItems([]);
          }}
        />
      )}
    </div>
  );
}