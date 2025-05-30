import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Tag, AlertCircle, CheckCircle } from 'lucide-react';
import { Item } from '../types';
import { formatDate } from '../utils/formatters';

interface ItemCardProps {
  item: Item;
  onResolve?: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onResolve }) => {
  const isResolved = item.status === 'resolved';
  
  return (
    <div className={`card group transition-transform duration-300 hover:-translate-y-1 ${isResolved ? 'opacity-75' : ''}`}>
      <div className="relative">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        
        <div className="absolute top-2 left-2 flex space-x-2">
          <span className={`badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`}>
            {item.type === 'lost' ? 'Lost' : 'Found'}
          </span>
          
          {isResolved && (
            <span className="badge badge-resolved">
              Resolved
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/item/${item.id}`}>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-500">
            <Tag className="h-4 w-4 mr-2" />
            <span>{item.category}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{item.location}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{formatDate(item.date)}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {item.userAvatar ? (
              <img 
                src={item.userAvatar} 
                alt={item.userName} 
                className="h-6 w-6 rounded-full"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-800 text-xs font-medium">{item.userName.charAt(0)}</span>
              </div>
            )}
            <span className="ml-2 text-sm text-gray-600">{item.userName}</span>
          </div>
          
          {onResolve && !isResolved && (
            <button 
              onClick={() => onResolve(item.id)}
              className="text-sm text-green-600 hover:text-green-800 flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Resolve
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;