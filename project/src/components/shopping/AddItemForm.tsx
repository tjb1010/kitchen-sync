import React, { useState } from 'react';
import { CreateShoppingItemData } from '../../types/shopping';

interface AddItemFormProps {
  onSubmit: (data: CreateShoppingItemData) => Promise<void>;
  onCancel: () => void;
}

const commonUnits = [
  'oz', 'lb', 'g', 'kg',
  'ml', 'l', 'gal', 'qt',
  'cup', 'tbsp', 'tsp',
  'pkg', 'can', 'jar', 'box',
  'piece', 'bunch', 'bag'
];

export function AddItemForm({ onSubmit, onCancel }: AddItemFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    unit: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit({
        name: formData.name.trim(),
        quantity: formData.quantity,
        unit: formData.unit.trim() || undefined
      });
      setFormData({ name: '', quantity: 1, unit: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-spotify-green focus:ring-spotify-green"
          placeholder="e.g., Milk, Bread, Apples"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
          <input
            type="number"
            min="0.1"
            step="any"
            required
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 1 })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-spotify-green focus:ring-spotify-green"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Unit (optional)</label>
          <input
            type="text"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            list="common-units"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-spotify-green focus:ring-spotify-green"
            placeholder="e.g., oz, pkg, can"
          />
          <datalist id="common-units">
            {commonUnits.map(unit => (
              <option key={unit} value={unit} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-black bg-spotify-green border border-transparent rounded-md hover:bg-opacity-80 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Item'}
        </button>
      </div>
    </form>
  );
}