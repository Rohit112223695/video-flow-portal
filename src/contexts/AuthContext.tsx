
import React, { createContext, useState, useContext, useEffect } from 'react';

export type UserRole = 'collector' | 'reviewer' | 'superqu' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for testing purposes
const mockUsers = [
  {
    id: '1',
    name: 'Data Collector',
    email: 'collector@example.com',
    password: 'password',
    role: 'collector' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=collector'
  },
  {
    id: '2',
    name: 'Video Reviewer',
    email: 'reviewer@example.com',
    password: 'password',
    role: 'reviewer' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=reviewer'
  },
  {
    id: '3',
    name: 'Super QU',
    email: 'superqu@example.com',
    password: 'password',
    role: 'superqu' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=superqu'
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('videoFlowUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('videoFlowUser', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('videoFlowUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
