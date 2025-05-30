import React, { useState } from 'react';
import { useItems } from '../contexts/ItemsContext';
import ItemsGrid from '../components/ItemsGrid';
import FilterPanel from '../components/FilterPanel';
import { ItemFilters } from '../types';

const LostItems: React.FC = () => {
  const { getLostItems, markAsResolved } = useItems();
  const [filters, setFilters] = useState<ItemFilters>({});
  
  const filteredItems = getLostItems(filters);
  
  const handleFilterChange = (newFilters: ItemFilters) => {
    setFilters(newFilters);
  };
  
  const handleResolve = (id: string) => {
    markAsResolved(id);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Lost Items</h1>
        <p className="text-gray-600">
          Browse through items that have been reported as lost on campus. If you've found any of these items, you can help return them to their owners.
        </p>
      </div>
      
      <FilterPanel 
        onFilterChange={handleFilterChange}
        itemType="lost"
      />
      
      <ItemsGrid 
        items={filteredItems} 
        onResolve={handleResolve}
        emptyMessage="No lost items match your search criteria"
      />
    </div>
  );
};

export default LostItems;