import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Loader } from 'lucide-react';
import { useItems } from '../contexts/ItemsContext';
import { ItemFormData } from '../types';

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
  'Outdoor Areas',
  'Other'
];

const mockImageUrls = [
  'https://images.pexels.com/photos/1209705/pexels-photo-1209705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

const PostItem: React.FC = () => {
  const { addItem, isLoading, error } = useItems();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<ItemFormData>({
    title: '',
    description: '',
    category: '',
    type: 'lost',
    location: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showMockImages, setShowMockImages] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    
    if (!formData.location) {
      errors.location = 'Location is required';
    }
    
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleTypeChange = (type: 'lost' | 'found') => {
    setFormData(prev => ({
      ...prev,
      type
    }));
  };
  
  const handleSelectMockImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl
    }));
    setShowMockImages(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (validateForm()) {
      try {
        const result = await addItem(formData);
        if (result) {
          navigate(`/${formData.type}`);
        }
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Failed to post item');
      }
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Post an Item</h1>
        
        {(error || submitError) && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error || submitError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-md flex-1 ${
                  formData.type === 'lost'
                    ? 'bg-red-100 text-red-800 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
                onClick={() => handleTypeChange('lost')}
              >
                I Lost an Item
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md flex-1 ${
                  formData.type === 'found'
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
                onClick={() => handleTypeChange('found')}
              >
                I Found an Item
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input ${formErrors.title ? 'border-red-500' : ''}`}
              placeholder="Brief title describing the item"
            />
            {formErrors.title && (
              <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`input ${formErrors.description ? 'border-red-500' : ''}`}
              placeholder="Detailed description of the item, including any identifying features"
            />
            {formErrors.description && (
              <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`input ${formErrors.category ? 'border-red-500' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {formErrors.category && (
                <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="location" className="form-label">Location</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`input ${formErrors.location ? 'border-red-500' : ''}`}
              >
                <option value="">Select a location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              {formErrors.location && (
                <p className="mt-1 text-sm text-red-600">{formErrors.location}</p>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date {formData.type === 'lost' ? 'Lost' : 'Found'}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`input ${formErrors.date ? 'border-red-500' : ''}`}
            />
            {formErrors.date && (
              <p className="mt-1 text-sm text-red-600">{formErrors.date}</p>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">Image</label>
            
            {formData.imageUrl ? (
              <div className="mt-2 relative">
                <img 
                  src={formData.imageUrl} 
                  alt="Selected item" 
                  className="h-48 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                >
                  <span className="sr-only">Remove image</span>
                  ×
                </button>
              </div>
            ) : (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setShowMockImages(!showMockImages)}
                  className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Add an image</span>
                  <span className="text-xs text-gray-500 mt-1">Click to select from example images</span>
                </button>
                
                {showMockImages && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                    {mockImageUrls.map((url, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelectMockImage(url)}
                        className="relative rounded-md overflow-hidden aspect-square border-2 border-transparent hover:border-blue-500 focus:outline-none focus:border-blue-500"
                      >
                        <img 
                          src={url} 
                          alt={`Example image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 mr-2" />
                  Post Item
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostItem;