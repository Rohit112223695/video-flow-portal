
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ReviewHistory as ReviewHistoryComponent } from '@/components/review/ReviewHistory';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

// Mock review history data (same as in ReviewQueue.tsx)
const reviewHistory = [
  { id: 'h1', videoTitle: 'Street Interview in Central Park', date: '2025-04-18', action: 'Approved', comments: 'Good quality content' },
  { id: 'h2', videoTitle: 'Product Unboxing - New Smartphone', date: '2025-04-17', action: 'Rejected', comments: 'Poor audio quality' },
  { id: 'h3', videoTitle: 'City Tour - Downtown Area', date: '2025-04-15', action: 'Approved', comments: 'Excellent coverage' },
  { id: 'h4', videoTitle: 'Local Business Profile', date: '2025-04-12', action: 'Rejected', comments: 'Lighting issues' },
  { id: 'h5', videoTitle: 'Tech Conference Highlights', date: '2025-04-10', action: 'Approved', comments: 'Good content' },
];

const ReviewHistoryPage = () => {
  const { user } = useAuth();
  
  // Only allow reviewers and superqc to access this page
  if (!user) return null;
  if (user.role !== 'reviewer' && user.role !== 'superqc') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DashboardLayout>
      <ReviewHistoryComponent history={reviewHistory} />
    </DashboardLayout>
  );
};

export default ReviewHistoryPage;
