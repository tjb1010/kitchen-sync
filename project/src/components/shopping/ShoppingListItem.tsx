import React, { useState } from 'react';
import { Trash2, Edit2, X, Check } from 'lucide-react';
import { ShoppingItem } from '../../types/shopping';
import { Tooltip } from '../ui/Tooltip';

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggleComplete: (id: string, completed: boolean) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<ShoppingItem, 'name' | 'quantity' | 'unit' | 'completed' | 'category'>>) => void;
}

export function ShoppingListItem({ 
  item, 
  onToggleComplete, 
  onRemove,
  onUpdate
}: ShoppingListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({
    name: item.name,
    quantity: item.quantity,
    unit: item.unit || ''
  });

  const displayText = item.quantity > 1
    ? `${item.quantity} ${item.unit ? item.unit + ' ' : ''}${item.name}`
    : `${item.name}${item.unit ? ' ' + item.unit : ''}`;

  const handleSave = () => {
    onUpdate(item.id, {
      name: editedItem.name.trim(),
      quantity: editedItem.quantity,
      unit: editedItem.unit.trim() || undefined
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center justify-between py-2 px-4 border-b dark:border-spotify-divider last:border-b-0 bg-spotify-base rounded-lg">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editedItem.name}
            onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
            className="flex-1 px-2 py-1 bg-spotify-hover border border-spotify-divider rounded focus:border-spotify-green focus:ring-spotify-green text-spotify-lightest"
            placeholder="Item name"
          />
          <input
            type="number"
            value={editedItem.quantity}
            onChange={(e) => setEditedItem({ ...editedItem, quantity: parseFloat(e.target.value) || 1 })}
            step="any"
            min="0.1"
            className="w-20 px-2 py-1 bg-spotify-hover border border-spotify-divider rounded focus:border-spotify-green focus:ring-spotify-green text-spotify-lightest"
          />
          <input
            type="text"
            value={editedItem.unit}
            onChange={(e) => setEditedItem({ ...editedItem, unit: e.target.value })}
            className="w-20 px-2 py-1 bg-spotify-hover border border-spotify-divider rounded focus:border-spotify-green focus:ring-spotify-green text-spotify-lightest"
            placeholder="Unit"
          />
          <Tooltip content="Cancel">
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 text-spotify-light hover:text-spotify-lightest rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </Tooltip>
          <Tooltip content="Save changes">
            <button
              onClick={handleSave}
              className="p-1 text-spotify-green hover:text-opacity-80 rounded-full"
            >
              <Check className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-2 border-b dark:border-spotify-divider last:border-b-0 group hover:bg-spotify-hover transition-colors duration-200 rounded-md px-2">
      <div 
        className="flex-1 cursor-pointer"
        onClick={() => onToggleComplete(item.id, !item.completed)}
      >
        <div className="flex items-center space-x-3">
          <Tooltip content={item.completed ? "Mark as incomplete" : "Mark as complete"}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onToggleComplete(item.id, !item.completed)}
              className="h-4 w-4 text-spotify-green rounded border-spotify-divider focus:ring-spotify-green cursor-pointer"
            />
          </Tooltip>
          <div>
            <span className={`${
              item.completed 
                ? 'line-through text-gray-400 dark:text-gray-500' 
                : 'text-gray-700 dark:text-gray-200'
            }`}>
              {displayText}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Tooltip content="Edit item">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-spotify-light hover:text-spotify-green rounded-full transition-colors duration-200"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </Tooltip>
        <Tooltip content="Remove item">
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 text-spotify-light hover:text-red-500 rounded-full transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}