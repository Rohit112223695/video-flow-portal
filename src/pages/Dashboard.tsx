
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { VideoCard } from '@/components/dashboard/VideoCard';
import { mockVideos, mockTrendData } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { CollectorStatGrid } from '@/components/dashboard/CollectorStatGrid';
import { ReviewerStatGrid } from '@/components/dashboard/ReviewerStatGrid';
import { SuperQUStatGrid } from '@/components/dashboard/SuperQUStatGrid';
import { AdminStatGrid } from '@/components/dashboard/AdminStatGrid';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [recentVideos, setRecentVideos] = useState([]);
  
  useEffect(() => {
    // Simulate loading recent videos based on user role
    if (user?.role === 'collector') {
      setRecentVideos(mockVideos.filter(video => video.uploader === user.id).slice(0, 4));
    } else if (user?.role === 'reviewer') {
      setRecentVideos(mockVideos.filter(video => video.status === 'pending').slice(0, 4));
    } else if (user?.role === 'superqc') {
      setRecentVideos(mockVideos.filter(video => video.status === 'reviewing').slice(0, 4));
    } else if (user?.role === 'admin') {
      setRecentVideos(mockVideos.slice(0, 4));
    }
  }, [user]);
  
  const handleVideoAction = (id: string, action: string) => {
    toast({
      title: "Video Action",
      description: `Action "${action}" taken on video ID: ${id}`,
    });
  };
  
  const renderRoleSpecificStats = () => {
    switch (user?.role) {
      case 'collector':
        return <CollectorStatGrid />;
      case 'reviewer':
        return <ReviewerStatGrid />;
      case 'superqc':
        return <SuperQUStatGrid />;
      case 'admin':
        return <AdminStatGrid />;
      default:
        return null;
    }
  };
  
  const renderRoleSpecificTitle = () => {
    switch (user?.role) {
      case 'collector':
        return 'Data Collector Dashboard';
      case 'reviewer':
        return 'Video Reviewer Dashboard';
      case 'superqc':
        return 'Super QC Dashboard';
      case 'admin':
        return 'Admin Dashboard';
      default:
        return 'Dashboard';
    }
  };
  
  if (!user) return null;
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">{renderRoleSpecificTitle()}</h1>
        
        {renderRoleSpecificStats()}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Video Processing Trends</CardTitle>
              <CardDescription>7-month view of video processing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pending"
                      stroke="#ff9800"
                      activeDot={{ r: 8 }}
                      name="Pending"
                    />
                    <Line type="monotone" dataKey="reviewing" stroke="#2196f3" name="In Review" />
                    <Line type="monotone" dataKey="approved" stroke="#4caf50" name="Approved" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>At a Glance</CardTitle>
              <CardDescription>
                {user.role === 'collector' && 'Your recent video submissions'}
                {user.role === 'reviewer' && 'Videos awaiting your review'}
                {user.role === 'superqc' && 'Videos pending QC approval'}
                {user.role === 'admin' && 'Recent platform activity'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.role === 'collector' && (
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <div className="text-sm font-medium">Your Acceptance Rate</div>
                      <div className="text-2xl font-bold">86.4%</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                  </div>
                )}
                
                {user.role === 'reviewer' && (
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <div className="text-sm font-medium">Hours Logged This Week</div>
                      <div className="text-2xl font-bold">12.5</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                  </div>
                )}
                
                {user.role === 'superqc' && (
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <div className="text-sm font-medium">Quality Score</div>
                      <div className="text-2xl font-bold">94.8%</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                  </div>
                )}
                
                {user.role === 'admin' && (
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <div className="text-sm font-medium">System Health</div>
                      <div className="text-2xl font-bold">Excellent</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">
                    {user.role === 'collector' && 'Your Recent Videos'}
                    {user.role === 'reviewer' && 'Review Queue'}
                    {user.role === 'superqc' && 'Approval Queue'}
                    {user.role === 'admin' && 'Recent Activity'}
                  </h3>
                  <div className="space-y-3">
                    {recentVideos.map((video: any) => (
                      <div key={video.id} className="flex items-center gap-3 p-2 bg-card rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{video.title}</div>
                          <div className="text-xs text-muted-foreground">{video.uploadDate}</div>
                        </div>
                        <div className={`h-2 w-2 rounded-full ${
                          video.status === 'pending' ? 'bg-yellow-500' : 
                          video.status === 'reviewing' ? 'bg-blue-500' : 
                          video.status === 'approved' ? 'bg-green-500' : 
                          'bg-red-500'
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {user.role === 'collector' && 'My Videos'}
            {user.role === 'reviewer' && 'Available for Review'}
            {user.role === 'superqc' && 'Waiting for Quality Check'}
            {user.role === 'admin' && 'Recent Submissions'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockVideos.slice(0, 4).map(video => (
              <VideoCard 
                key={video.id}
                id={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                duration={video.duration}
                status={video.status as any}
                uploadDate={video.uploadDate}
                onAction={handleVideoAction}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
