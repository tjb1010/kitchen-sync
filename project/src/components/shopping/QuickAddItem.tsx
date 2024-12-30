import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

interface QuickAddItemProps {
  onAdd: (data: { name: string; quantity: number; unit?: string }) => Promise<void>;
  placeholder?: string;
}

export function QuickAddItem({ onAdd, placeholder = "Add new item..." }: QuickAddItemProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commonUnits = [
    'oz', 'lb', 'g', 'kg',
    'ml', 'l', 'gal', 'qt',
    'cup', 'tbsp', 'tsp',
    'pkg', 'can', 'jar', 'box',
    'piece', 'bunch', 'bag'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;
    try {
      setIsSubmitting(true);
      const parsedQuantity = parseFloat(quantity) || 1;
      await onAdd({
        name: name.trim(),
        quantity: parsedQuantity,
        unit: unit.trim() || undefined
      });
      setName('');
      setQuantity('1');
      setUnit('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-l-full px-4 py-2 bg-spotify-base border border-spotify-divider focus:border-spotify-green focus:ring-spotify-green text-spotify-lightest"
      />
      <Tooltip content="Quantity (e.g., 2, 0.5, 1.5)">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          step="any"
          min="0.1"
          className="w-20 px-2 py-2 bg-spotify-base border-y border-spotify-divider focus:border-spotify-green focus:ring-spotify-green text-spotify-lightest"
        />
      </Tooltip>
      <Tooltip content="Unit (e.g., oz, lb, pkg)">
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="unit"
          list="common-units"
          className="w-24 px-2 py-2 bg-spotify-base border border-spotify-divider rounded-r-full focus:border-spotify-green focus:ring-spotify-green text-spotify-lightest"
        />
      </Tooltip>
      <datalist id="common-units">
        {commonUnits.map(unit => (
          <option key={unit} value={unit} />
        ))}
      </datalist>
      <button
        type="submit"
        disabled={!name.trim() || isSubmitting}
        className="p-2 text-spotify-light hover:text-spotify-green disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
      >
        <Plus className="h-5 w-5" />
      </button>
    </form>
  );
}