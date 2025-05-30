import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User, AuthContextType } from '../types';

// Mock data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@campus.edu',
    password: 'admin123',
    isAdmin: true,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@campus.edu',
    password: 'user123',
    isAdmin: false,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: new Date(),
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Remove password from user data
      const { password: _, ...safeUserData } = foundUser;
      
      // Save to local storage and state
      localStorage.setItem('user', JSON.stringify(safeUserData));
      setUser(safeUserData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser = {
        id: uuidv4(),
        name,
        email,
        password,
        isAdmin: false,
        createdAt: new Date(),
      };
      
      // Add to mock database
      MOCK_USERS.push(newUser);
      
      // Remove password from user data
      const { password: _, ...safeUserData } = newUser;
      
      // Save to local storage and state
      localStorage.setItem('user', JSON.stringify(safeUserData));
      setUser(safeUserData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};