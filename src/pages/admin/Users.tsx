import React from 'react';
import { User, Trash2, Calendar, Mail, Shield, ShieldAlert } from 'lucide-react';

// Mock users data
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@campus.edu',
    isAdmin: true,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2023-01-15'),
    itemsPosted: 2,
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@campus.edu',
    isAdmin: false,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: new Date('2023-02-20'),
    itemsPosted: 3,
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@campus.edu',
    isAdmin: false,
    createdAt: new Date('2023-03-10'),
    itemsPosted: 0,
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane@campus.edu',
    isAdmin: false,
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    createdAt: new Date('2023-04-05'),
    itemsPosted: 1,
  },
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = React.useState(MOCK_USERS);
  
  const toggleAdminStatus = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isAdmin: !user.isAdmin }
          : user
      )
    );
  };
  
  const deleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-gray-600 mt-1">
          View and manage user accounts in the system.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items Posted
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isAdmin 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.isAdmin ? (
                        <>
                          <ShieldAlert className="h-3 w-3 mr-1" />
                          Admin
                        </>
                      ) : (
                        <>
                          <User className="h-3 w-3 mr-1" />
                          User
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {formatDate(user.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.itemsPosted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => toggleAdminStatus(user.id)}
                        className={`${
                          user.isAdmin 
                            ? 'text-purple-600 hover:text-purple-900' 
                            : 'text-blue-600 hover:text-blue-900'
                        }`}
                        title={user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                      >
                        <Shield className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete User"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;