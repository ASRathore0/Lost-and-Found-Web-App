import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';
import { Item, ItemFormData, ItemFilters, ItemsContextType } from '../types';

// Mock data for items
const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    title: 'Lost MacBook Pro',
    description: 'Silver MacBook Pro 13" with stickers on the cover. Last seen in the University Library.',
    category: 'Electronics',
    type: 'lost',
    location: 'University Library',
    date: '2023-05-10',
    imageUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'approved',
    userId: '2',
    userName: 'Regular User',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: new Date('2023-05-10T14:30:00'),
    updatedAt: new Date('2023-05-10T14:30:00'),
  },
  {
    id: '2',
    title: 'Found Student ID Card',
    description: 'Found a student ID card near the Student Union Building. Name on card is partially visible.',
    category: 'Documents',
    type: 'found',
    location: 'Student Union',
    date: '2023-05-12',
    imageUrl: 'https://images.pexels.com/photos/6863251/pexels-photo-6863251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'approved',
    userId: '1',
    userName: 'Admin User',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2023-05-12T09:15:00'),
    updatedAt: new Date('2023-05-12T09:15:00'),
  },
  {
    id: '3',
    title: 'Lost Blue Backpack',
    description: 'Lost my blue Northface backpack with my notebooks and calculator. Last seen in the Science Building.',
    category: 'Bags & Backpacks',
    type: 'lost',
    location: 'Science Building',
    date: '2023-05-15',
    imageUrl: 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'resolved',
    userId: '2',
    userName: 'Regular User',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: new Date('2023-05-15T16:45:00'),
    updatedAt: new Date('2023-05-18T10:30:00'),
  },
  {
    id: '4',
    title: 'Found Water Bottle',
    description: 'Found a metal water bottle in Lecture Hall A. Has some stickers on it.',
    category: 'Other',
    type: 'found',
    location: 'Lecture Hall A',
    date: '2023-05-16',
    imageUrl: 'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'pending',
    userId: '2',
    userName: 'Regular User',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: new Date('2023-05-16T11:20:00'),
    updatedAt: new Date('2023-05-16T11:20:00'),
  },
  {
    id: '5',
    title: 'Lost Glasses',
    description: 'Lost my prescription glasses with black frames. They might be in a black case.',
    category: 'Accessories',
    type: 'lost',
    location: 'Dining Hall',
    date: '2023-05-18',
    imageUrl: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'approved',
    userId: '1',
    userName: 'Admin User',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2023-05-18T13:10:00'),
    updatedAt: new Date('2023-05-18T13:10:00'),
  },
];

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      localStorage.setItem('items', JSON.stringify(MOCK_ITEMS));
    }
  }, []);

  const addItem = async (itemData: ItemFormData): Promise<Item> => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!user) {
        throw new Error('You must be logged in to post an item');
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newItem: Item = {
        id: uuidv4(),
        ...itemData,
        status: user.isAdmin ? 'approved' : 'pending',
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setItems(prev => {
        const newItems = [newItem, ...prev];
        localStorage.setItem('items', JSON.stringify(newItems));
        return newItems;
      });
      
      return newItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (id: string, itemUpdate: Partial<Item>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setItems(prev => {
        const newItems = prev.map(item => 
          item.id === id 
            ? { ...item, ...itemUpdate, updatedAt: new Date() }
            : item
        );
        localStorage.setItem('items', JSON.stringify(newItems));
        return newItems;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setItems(prev => {
        const newItems = prev.filter(item => item.id !== id);
        localStorage.setItem('items', JSON.stringify(newItems));
        return newItems;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const markAsResolved = async (id: string) => {
    return updateItem(id, { status: 'resolved' });
  };

  const approveItem = async (id: string) => {
    return updateItem(id, { status: 'approved' });
  };

  const rejectItem = async (id: string) => {
    return updateItem(id, { status: 'rejected' });
  };

  const getItemById = (id: string) => {
    return items.find(item => item.id === id);
  };

  const applyFilters = (items: Item[], filters?: ItemFilters) => {
    if (!filters) return items;
    
    return items.filter(item => {
      if (filters.search && 
          !item.title.toLowerCase().includes(filters.search.toLowerCase()) && 
          !item.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      if (filters.category && item.category !== filters.category) {
        return false;
      }
      
      if (filters.location && item.location !== filters.location) {
        return false;
      }
      
      if (filters.dateFrom) {
        const dateFrom = new Date(filters.dateFrom);
        const itemDate = new Date(item.date);
        if (itemDate < dateFrom) return false;
      }
      
      if (filters.dateTo) {
        const dateTo = new Date(filters.dateTo);
        const itemDate = new Date(item.date);
        if (itemDate > dateTo) return false;
      }
      
      if (filters.status && item.status !== filters.status) {
        return false;
      }
      
      return true;
    });
  };

  const getLostItems = (filters?: ItemFilters) => {
    return applyFilters(
      items.filter(item => item.type === 'lost' && item.status === 'approved'),
      filters
    );
  };

  const getFoundItems = (filters?: ItemFilters) => {
    return applyFilters(
      items.filter(item => item.type === 'found' && item.status === 'approved'),
      filters
    );
  };

  const getPendingItems = () => {
    return items.filter(item => item.status === 'pending');
  };

  const getResolvedItems = () => {
    return items.filter(item => item.status === 'resolved');
  };

  return (
    <ItemsContext.Provider 
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        markAsResolved,
        approveItem,
        rejectItem,
        getItemById,
        getLostItems,
        getFoundItems,
        getPendingItems,
        getResolvedItems,
        isLoading,
        error,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = (): ItemsContextType => {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};