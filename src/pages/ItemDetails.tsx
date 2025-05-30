import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Tag, 
  Calendar,
  CheckCircle,
  ArrowLeft,
  AlertTriangle,
  Mail
} from 'lucide-react';
import { useItems } from '../contexts/ItemsContext';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../utils/formatters';

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getItemById, markAsResolved } = useItems();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isResolving, setIsResolving] = useState(false);
  
  const item = getItemById(id || '');
  
  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Item Not Found</h1>
        <p className="text-gray-600 mb-8">
          The item you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const isOwner = user && user.id === item.userId;
  const isAdmin = user && user.isAdmin;
  const canResolve = isOwner || isAdmin;
  const isResolved = item.status === 'resolved';
  
  const handleMarkAsResolved = async () => {
    setIsResolving(true);
    try {
      await markAsResolved(item.id);
    } catch (error) {
      console.error('Failed to mark as resolved:', error);
    } finally {
      setIsResolving(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </button>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {item.imageUrl ? (
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-64 md:h-full object-cover"
              />
            ) : (
              <div className="w-full h-64 md:h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          
          <div className="p-6 md:w-1/2">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`}>
                {item.type === 'lost' ? 'Lost' : 'Found'}
              </span>
              
              {isResolved && (
                <span className="badge badge-resolved">
                  Resolved
                </span>
              )}
            </div>
            
            <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date {item.type === 'lost' ? 'Lost' : 'Found'}</p>
                  <p className="font-medium">{formatDate(item.date)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{item.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Tag className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{item.category}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Posted on</p>
                  <p className="font-medium">{formatDate(item.createdAt.toString())}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center mb-4">
                {item.userAvatar ? (
                  <img 
                    src={item.userAvatar} 
                    alt={item.userName} 
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 font-medium">{item.userName.charAt(0)}</span>
                  </div>
                )}
                <div className="ml-3">
                  <p className="font-medium">{item.userName}</p>
                  <p className="text-sm text-gray-500">Posted by</p>
                </div>
              </div>
              
              {!isResolved && (
                <div className="space-y-4">
                  <a 
                    href={`mailto:contact@campus.edu?subject=${encodeURIComponent(`Regarding ${item.type} item: ${item.title}`)}`}
                    className="btn flex items-center justify-center w-full bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact About This Item
                  </a>
                  
                  {canResolve && (
                    <button 
                      onClick={handleMarkAsResolved}
                      disabled={isResolving}
                      className="btn-success flex items-center justify-center w-full"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {isResolving ? 'Marking as Resolved...' : 'Mark as Resolved'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;