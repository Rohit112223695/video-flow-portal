import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { VideoCard } from '@/components/dashboard/VideoCard';
import { mockVideos } from '@/services/mockData';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReviewFilter } from '@/components/review/ReviewFilter';
import { ReviewHistory } from '@/components/review/ReviewHistory';
import { ReviewAnalytics } from '@/components/review/ReviewAnalytics';
import { RejectDialog } from '@/components/review/RejectDialog';
import { ApproveDialog } from '@/components/review/ApproveDialog';

// Mock review history data
const reviewHistory = [
  { id: 'h1', videoTitle: 'Street Interview in Central Park', date: '2025-04-18', action: 'Approved', comments: 'Good quality content' },
  { id: 'h2', videoTitle: 'Product Unboxing - New Smartphone', date: '2025-04-17', action: 'Rejected', comments: 'Poor audio quality' },
  { id: 'h3', videoTitle: 'City Tour - Downtown Area', date: '2025-04-15', action: 'Approved', comments: 'Excellent coverage' },
  { id: 'h4', videoTitle: 'Local Business Profile', date: '2025-04-12', action: 'Rejected', comments: 'Lighting issues' },
  { id: 'h5', videoTitle: 'Tech Conference Highlights', date: '2025-04-10', action: 'Approved', comments: 'Good content' },
];

const ReviewQueue = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [videoInReview, setVideoInReview] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionCategory, setRejectionCategory] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('queue');

  // Filter videos by status and search query
  const filteredVideos = mockVideos.filter(video => {
    const matchesFilter = filter === 'all' || video.status === filter;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleVideoAction = (id: string, action: string) => {
    const video = mockVideos.find(v => v.id === id);
    if (!video) return;

    switch(action) {
      case 'review':
        video.status = 'reviewing';
        toast({
          title: "Review Started",
          description: `You've started reviewing "${video.title}"`,
        });
        break;
      case 'reject':
        setVideoInReview(video);
        setShowRejectDialog(true);
        break;
      case 'approve':
        setVideoInReview(video);
        setShowApproveDialog(true);
        break;
      default:
        toast({
          title: "Action Taken",
          description: `Action "${action}" on video ID: ${id}`,
        });
    }
  };

  const handleReject = () => {
    if (!videoInReview || !rejectionCategory) {
      toast({
        title: "Error",
        description: "Please select a rejection reason",
        variant: "destructive"
      });
      return;
    }

    videoInReview.status = 'rejected';
    toast({
      title: "Video Rejected",
      description: `"${videoInReview.title}" has been rejected and sent back to the collector`,
    });

    setShowRejectDialog(false);
    setRejectionReason('');
    setRejectionCategory('');
    setVideoInReview(null);
  };

  const handleApprove = () => {
    if (!videoInReview) return;

    if (user?.role === 'reviewer') {
      videoInReview.status = 'reviewing';
      toast({
        title: "Video Forwarded",
        description: `"${videoInReview.title}" has been forwarded to Super QC`,
      });
    } else if (user?.role === 'superqu') {
      videoInReview.status = 'approved';
      toast({
        title: "Video Approved",
        description: `"${videoInReview.title}" has been approved`,
      });
    }

    setShowApproveDialog(false);
    setVideoInReview(null);
  };

  const getTitle = () => {
    if (user?.role === 'reviewer') return 'Review Queue';
    if (user?.role === 'superqu') return 'Quality Check Queue';
    return 'Video Queue';
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="history">Review History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">{getTitle()}</h1>
            <ReviewFilter 
              filter={filter}
              setFilter={setFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map(video => (
                <VideoCard 
                  key={video.id}
                  {...video}
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
        </TabsContent>

        <TabsContent value="history">
          <ReviewHistory history={reviewHistory} />
        </TabsContent>

        <TabsContent value="analytics">
          <ReviewAnalytics />
        </TabsContent>
      </Tabs>

      <RejectDialog 
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        rejectionCategory={rejectionCategory}
        setRejectionCategory={setRejectionCategory}
        onReject={handleReject}
      />

      <ApproveDialog 
        open={showApproveDialog}
        onOpenChange={setShowApproveDialog}
        onApprove={handleApprove}
        isReviewer={user.role === 'reviewer'}
      />
    </DashboardLayout>
  );
};

export default ReviewQueue;
