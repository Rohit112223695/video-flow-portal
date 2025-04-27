
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-16 md:ml-64 min-h-screen">
        <Header />
        <main className="pt-16 pb-10 px-4 md:px-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
