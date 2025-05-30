import React from 'react';
import { Item } from '../types';
import ItemCard from './ItemCard';

interface ItemsGridProps {
  items: Item[];
  onResolve?: (id: string) => void;
  emptyMessage?: string;
}

const ItemsGrid: React.FC<ItemsGridProps> = ({ 
  items, 
  onResolve,
  emptyMessage = "No items found" 
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onResolve={onResolve}
        />
      ))}
    </div>
  );
};

export default ItemsGrid;