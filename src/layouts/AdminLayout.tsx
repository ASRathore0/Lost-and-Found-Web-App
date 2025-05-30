import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  LogOut, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40 flex">
          {/* Sidebar overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <div 
            className={`
              fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-gray-800 transform ease-in-out duration-300
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-white font-semibold">Admin Panel</span>
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 py-4 space-y-1">
                <Link
                  to="/admin"
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md
                    ${location.pathname === '/admin' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
                
                <Link
                  to="/admin/items"
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md
                    ${location.pathname === '/admin/items' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Package className="h-5 w-5 mr-3" />
                  Manage Items
                </Link>
                
                <Link
                  to="/admin/users"
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md
                    ${location.pathname === '/admin/users' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Users className="h-5 w-5 mr-3" />
                  Manage Users
                </Link>
              </nav>
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center">
                {user?.avatar ? (
                  <img 
                    src={user.avatar}
                    alt={user.name}
                    className="h-9 w-9 rounded-full"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 font-medium">{user?.name.charAt(0)}</span>
                  </div>
                )}
                
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-xs font-medium text-gray-400 hover:text-white"
                  >
                    <LogOut className="h-3 w-3 mr-1" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </div>
      
      {/* Top Navigation */}
      <div className="lg:hidden bg-white shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-lg font-bold">Admin Panel</span>
          </div>
          
          <div className="w-6" />
        </div>
        
        <div className="px-4 py-2 bg-gray-50 border-b text-sm">
          <div className="flex items-center text-gray-500">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-900">Admin</span>
            {location.pathname !== '/admin' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-gray-900">
                  {location.pathname.includes('/users') ? 'Users' : 'Items'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 min-h-screen fixed">
          <div className="flex items-center h-16 px-4 bg-gray-900">
            <Package className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-white font-semibold">Admin Panel</span>
          </div>
          
          <div className="mt-6">
            <nav className="px-3 space-y-1">
              <Link
                to="/admin"
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${location.pathname === '/admin' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                `}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
              
              <Link
                to="/admin/items"
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${location.pathname === '/admin/items' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                `}
              >
                <Package className="h-5 w-5 mr-3" />
                Manage Items
              </Link>
              
              <Link
                to="/admin/users"
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${location.pathname === '/admin/users' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                `}
              >
                <Users className="h-5 w-5 mr-3" />
                Manage Users
              </Link>
            </nav>
          </div>
          
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
            <div className="flex items-center">
              {user?.avatar ? (
                <img 
                  src={user.avatar}
                  alt={user.name}
                  className="h-9 w-9 rounded-full"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-medium">{user?.name.charAt(0)}</span>
                </div>
              )}
              
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-xs font-medium text-gray-400 hover:text-white"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 ml-64">
          <header className="bg-white shadow-sm">
            <div className="px-6 py-4">
              <div className="flex items-center text-sm text-gray-500">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-gray-900">Admin</span>
                {location.pathname !== '/admin' && (
                  <>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-gray-900">
                      {location.pathname.includes('/users') ? 'Users' : 'Items'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </header>
          
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
      
      {/* Mobile Main Content */}
      <div className="lg:hidden">
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;