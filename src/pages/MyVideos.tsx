
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { VideoCard } from '@/components/dashboard/VideoCard';
import { mockVideos } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const MyVideos = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter videos by status and search query
  const filteredVideos = mockVideos.filter(video => {
    const matchesFilter = filter === 'all' || video.status === filter;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const handleVideoAction = (id: string, action: string) => {
    toast({
      title: "Video Action",
      description: `Action "${action}" taken on video ID: ${id}`,
    });
  };
  
  if (!user) return null;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">My Videos</h1>
          
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
                  <SelectItem value="reviewing">In Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No videos found</h2>
            <p className="text-muted-foreground mb-6">No videos match your current filters</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => setFilter('all')}>View All Videos</Button>
              <Button variant="outline" asChild>
                <a href="/upload">Upload New Video</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyVideos;
