import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { useItems } from '../contexts/ItemsContext';
import ItemsGrid from '../components/ItemsGrid';

const Home: React.FC = () => {
  const { getLostItems, getFoundItems } = useItems();
  
  // Get recent items
  const recentLostItems = getLostItems().slice(0, 3);
  const recentFoundItems = getFoundItems().slice(0, 3);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Campus Lost & Found Portal
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              The easiest way to report lost items or return found belongings to their rightful owners on campus.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/lost" className="btn-primary px-6 py-3 text-base">
                View Lost Items
              </Link>
              <Link to="/found" className="bg-white text-blue-700 hover:bg-blue-50 btn px-6 py-3 text-base">
                View Found Items
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Items</h3>
              <p className="text-gray-600">
                Browse through lost and found items that have been reported by the campus community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Upload className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Items</h3>
              <p className="text-gray-600">
                Report items you've lost or found on campus with details and photos to help with identification.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <CheckCircle className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Connected</h3>
              <p className="text-gray-600">
                Connect with item owners or finders to arrange for returns and mark items as resolved.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Lost Items */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recent Lost Items</h2>
            <Link to="/lost" className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </Link>
          </div>
          
          <ItemsGrid 
            items={recentLostItems} 
            emptyMessage="No lost items have been reported yet"
          />
        </div>
      </div>
      
      {/* Recent Found Items */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recent Found Items</h2>
            <Link to="/found" className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </Link>
          </div>
          
          <ItemsGrid 
            items={recentFoundItems}
            emptyMessage="No found items have been reported yet" 
          />
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Lost or Found Something?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Help reunite lost items with their owners or report something you've lost on campus.
          </p>
          <Link to="/post" className="btn bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 text-base font-medium">
            Post an Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;