import React, { useState } from 'react';
import { useItems } from '../contexts/ItemsContext';
import ItemsGrid from '../components/ItemsGrid';
import FilterPanel from '../components/FilterPanel';
import { ItemFilters } from '../types';

const FoundItems: React.FC = () => {
  const { getFoundItems, markAsResolved } = useItems();
  const [filters, setFilters] = useState<ItemFilters>({});
  
  const filteredItems = getFoundItems(filters);
  
  const handleFilterChange = (newFilters: ItemFilters) => {
    setFilters(newFilters);
  };
  
  const handleResolve = (id: string) => {
    markAsResolved(id);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Found Items</h1>
        <p className="text-gray-600">
          Browse through items that have been found on campus. If you recognize any of these items as yours, you can claim them.
        </p>
      </div>
      
      <FilterPanel 
        onFilterChange={handleFilterChange}
        itemType="found"
      />
      
      <ItemsGrid 
        items={filteredItems} 
        onResolve={handleResolve}
        emptyMessage="No found items match your search criteria"
      />
    </div>
  );
};

export default FoundItems;