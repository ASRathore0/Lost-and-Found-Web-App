import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  UserCheck, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { useItems } from '../../contexts/ItemsContext';

const AdminDashboard: React.FC = () => {
  const { 
    items,
    getLostItems, 
    getFoundItems, 
    getPendingItems, 
    getResolvedItems 
  } = useItems();
  
  const lostItems = getLostItems();
  const foundItems = getFoundItems();
  const pendingItems = getPendingItems();
  const resolvedItems = getResolvedItems();
  
  const stats = [
    {
      title: 'Total Items',
      value: items.length,
      icon: <Package className="h-7 w-7 text-blue-600" />,
      color: 'bg-blue-50 text-blue-800',
    },
    {
      title: 'Lost Items',
      value: lostItems.length,
      icon: <AlertTriangle className="h-7 w-7 text-red-600" />,
      color: 'bg-red-50 text-red-800',
    },
    {
      title: 'Found Items',
      value: foundItems.length,
      icon: <FileCheck className="h-7 w-7 text-green-600" />,
      color: 'bg-green-50 text-green-800',
    },
    {
      title: 'Pending Items',
      value: pendingItems.length,
      icon: <Clock className="h-7 w-7 text-yellow-600" />,
      color: 'bg-yellow-50 text-yellow-800',
    },
    {
      title: 'Resolved Items',
      value: resolvedItems.length,
      icon: <CheckCircle className="h-7 w-7 text-blue-600" />,
      color: 'bg-blue-50 text-blue-800',
    },
    {
      title: 'Active Users',
      value: 2, // Mock data
      icon: <UserCheck className="h-7 w-7 text-purple-600" />,
      color: 'bg-purple-50 text-purple-800',
    },
  ];
  
  // Recent activity - get the 5 most recent items
  const recentActivity = [...items]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color.split(' ')[0]} mr-4`}>
                {stat.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{stat.title}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          
          <div className="divide-y divide-gray-200">
            {recentActivity.length > 0 ? (
              recentActivity.map((item) => (
                <div key={item.id} className="py-3">
                  <div className="flex items-start">
                    <div className={`mt-0.5 p-1.5 rounded-md ${
                      item.type === 'lost' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {item.type === 'lost' ? (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      ) : (
                        <FileCheck className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <Link 
                          to={`/item/${item.id}`}
                          className="font-medium hover:text-blue-600"
                        >
                          {item.title}
                        </Link>
                        <span className={`ml-2 badge ${
                          item.status === 'pending' 
                            ? 'badge-pending' 
                            : item.status === 'resolved' 
                              ? 'badge-resolved'
                              : item.status === 'approved'
                                ? item.type === 'lost' 
                                  ? 'badge-lost' 
                                  : 'badge-found'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Posted by {item.userName} • {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-gray-500 text-center">No recent activity</p>
            )}
          </div>
          
          <div className="mt-4 text-right">
            <Link to="/admin/items" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all items →
            </Link>
          </div>
        </div>
        
        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
          
          <div className="divide-y divide-gray-200">
            {pendingItems.length > 0 ? (
              pendingItems.slice(0, 5).map((item) => (
                <div key={item.id} className="py-3">
                  <div className="flex items-start">
                    <div className={`mt-0.5 p-1.5 rounded-md ${
                      item.type === 'lost' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {item.type === 'lost' ? (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      ) : (
                        <FileCheck className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="ml-3 flex-grow">
                      <div className="flex items-center">
                        <Link 
                          to={`/item/${item.id}`}
                          className="font-medium hover:text-blue-600"
                        >
                          {item.title}
                        </Link>
                        <span className="ml-2 badge badge-pending">
                          pending
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Posted by {item.userName} • {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-gray-500 text-center">No pending approvals</p>
            )}
          </div>
          
          <div className="mt-4 text-right">
            <Link to="/admin/items" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Manage all items →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;