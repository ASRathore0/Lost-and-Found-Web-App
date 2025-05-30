import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { ItemFilters } from '../types';

interface FilterPanelProps {
  onFilterChange: (filters: ItemFilters) => void;
  itemType: 'lost' | 'found';
}

const categories = [
  'Electronics', 
  'Books & Notes', 
  'Clothing', 
  'Accessories', 
  'Documents', 
  'Keys', 
  'Bags & Backpacks', 
  'Other'
];

const locations = [
  'Library', 
  'Student Union', 
  'Science Building', 
  'Dining Hall', 
  'Gym', 
  'Dormitories', 
  'Lecture Halls', 
  'Outdoor Areas'
];

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, itemType }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ItemFilters>({
    search: '',
    category: '',
    location: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      category: '',
      location: '',
      dateFrom: '',
      dateTo: '',
      status: ''
    });
    onFilterChange({});
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleInputChange}
                placeholder={`Search ${itemType} items...`}
                className="input pl-10"
              />
            </div>
            
            <button
              type="button"
              onClick={toggleFilters}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {Object.values(filters).some(val => val && val !== '') && (
                <span className="ml-1 w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-xs rounded-full">
                  {Object.values(filters).filter(val => val && val !== '').length}
                </span>
              )}
            </button>
            
            <button 
              type="submit" 
              className="btn-primary"
            >
              Search
            </button>
          </div>
          
          {isFilterOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200 slide-in">
              <div>
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="form-label">Location</label>
                <select
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="dateFrom" className="form-label">Date From</label>
                <input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="dateTo" className="form-label">Date To</label>
                <input
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
              
              <div className="md:col-span-2 lg:col-span-4 flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary flex items-center"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FilterPanel;