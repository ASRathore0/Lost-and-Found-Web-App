import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  FileCheck, 
  Clock, 
  Filter,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useItems } from '../../contexts/ItemsContext';
import { Item, ItemFilters } from '../../types';
import { formatDate } from '../../utils/formatters';

type SortKey = 'title' | 'type' | 'category' | 'location' | 'date' | 'status' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const AdminItems: React.FC = () => {
  const { 
    items, 
    approveItem, 
    rejectItem, 
    deleteItem,
    isLoading
  } = useItems();
  
  const [filters, setFilters] = useState<ItemFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [actionItem, setActionItem] = useState<string | null>(null);
  
  const categories = Array.from(new Set(items.map(item => item.category)));
  const locations = Array.from(new Set(items.map(item => item.location)));
  const statuses = ['pending', 'approved', 'rejected', 'resolved'];
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value === 'all' ? undefined : value
    }));
  };
  
  const resetFilters = () => {
    setFilters({});
  };
  
  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };
  
  const sortItems = (a: Item, b: Item): number => {
    if (sortBy === 'date' || sortBy === 'createdAt') {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      const valueA = a[sortBy].toLowerCase();
      const valueB = b[sortBy].toLowerCase();
      return sortOrder === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  };
  
  const filteredItems = items.filter(item => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.location && item.location !== filters.location) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.type && item.type !== filters.type) return false;
    return true;
  }).sort(sortItems);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'approved':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-600" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };
  
  const handleApprove = async (id: string) => {
    setActionItem(id);
    try {
      await approveItem(id);
    } finally {
      setActionItem(null);
    }
  };
  
  const handleReject = async (id: string) => {
    setActionItem(id);
    try {
      await rejectItem(id);
    } finally {
      setActionItem(null);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      setActionItem(id);
      try {
        await deleteItem(id);
      } finally {
        setActionItem(null);
      }
    }
  };
  
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Items</h1>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white border border-gray-300 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200 slide-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={filters.type || 'all'}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="all">All Types</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={filters.category || 'all'}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                value={filters.location || 'all'}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={filters.status || 'all'}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="btn-secondary text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center">
                    Title
                    {sortBy === 'title' && (
                      sortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center">
                    Type
                    {sortBy === 'type' && (
                      sortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center">
                    Category
                    {sortBy === 'category' && (
                      sortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center">
                    Location
                    {sortBy === 'location' && (
                      sortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    {sortBy === 'date' && (
                      sortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortBy === 'status' && (
                      sortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    Posted On
                    {sortBy === 'createdAt' && (
                      sortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/item/${item.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.type === 'lost' ? (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        ) : (
                          <FileCheck className="h-3 w-3 mr-1" />
                        )}
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : item.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                      }`}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1">
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(item.createdAt.toString())}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {item.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(item.id)}
                              disabled={isLoading || actionItem === item.id}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleReject(item.id)}
                              disabled={isLoading || actionItem === item.id}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isLoading || actionItem === item.id}
                          className="text-gray-600 hover:text-gray-900"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    No items found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminItems;