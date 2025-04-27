
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { VideoCard } from '@/components/dashboard/VideoCard';
import { mockVideos } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const ReviewQueue = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter videos by status and search query
  const filteredVideos = mockVideos.filter(video => {
    const matchesFilter = filter === 'all' || video.status === filter;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const handleVideoAction = (id: string, action: string) => {
    toast({
      title: "Review Action",
      description: `Action "${action}" taken on video ID: ${id}`,
    });
  };
  
  // Helper to get the right title based on user role
  const getTitle = () => {
    if (user?.role === 'reviewer') return 'Review Queue';
    if (user?.role === 'superqu') return 'Quality Check Queue';
    return 'Video Queue';
  };
  
  if (!user) return null;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">{getTitle()}</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[200px] lg:w-[300px]"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Videos</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewing">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map(video => (
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
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Queue is empty</h2>
            <p className="text-muted-foreground mb-6">No videos are currently waiting for your review</p>
            <Button onClick={() => setFilter('all')}>View All Videos</Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ReviewQueue;
