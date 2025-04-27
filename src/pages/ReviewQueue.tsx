
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ThumbsDown, ThumbsUp, CheckCircle, XCircle } from 'lucide-react';

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
        // Set video to reviewing status
        toast({
          title: "Review Started",
          description: `You've started reviewing "${video.title}"`,
        });
        break;
      case 'reject':
        // Open reject dialog
        setVideoInReview(video);
        setShowRejectDialog(true);
        break;
      case 'approve':
        // Open approve dialog
        setVideoInReview(video);
        setShowApproveDialog(true);
        break;
      case 'details':
        toast({
          title: "Video Details",
          description: `Viewing details for "${video.title}"`,
        });
        break;
      default:
        toast({
          title: "Action Taken",
          description: `Action "${action}" on video ID: ${id}`,
        });
    }
  };
  
  const handleReject = () => {
    if (!videoInReview) return;
    
    if (!rejectionCategory) {
      toast({
        title: "Error",
        description: "Please select a rejection reason",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Video Rejected",
      description: `"${videoInReview.title}" has been rejected and sent back to the collector`,
    });
    
    // Reset state
    setShowRejectDialog(false);
    setRejectionReason('');
    setRejectionCategory('');
    setVideoInReview(null);
  };
  
  const handleApprove = () => {
    if (!videoInReview) return;
    
    const action = user?.role === 'reviewer' ? 'forwarded to Super QU' : 'approved';
    
    toast({
      title: "Video Approved",
      description: `"${videoInReview.title}" has been ${action}`,
    });
    
    // Reset state
    setShowApproveDialog(false);
    setVideoInReview(null);
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
      
      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ThumbsDown className="h-5 w-5 mr-2 text-red-500" />
              Reject Video
            </DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting this video. This feedback will be sent to the collector.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <Label>Rejection Category</Label>
              <RadioGroup value={rejectionCategory} onValueChange={setRejectionCategory}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quality" id="quality" />
                  <Label htmlFor="quality">Poor Video Quality</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="audio" id="audio" />
                  <Label htmlFor="audio">Audio Issues</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="content" id="content" />
                  <Label htmlFor="content">Content Problems</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other Issues</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Additional Comments</Label>
              <Textarea 
                id="rejection-reason" 
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide specific details about the issues..."
                className="h-32"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              Reject Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ThumbsUp className="h-5 w-5 mr-2 text-green-500" />
              {user?.role === 'reviewer' ? 'Forward Video' : 'Approve Video'}
            </DialogTitle>
            <DialogDescription>
              {user?.role === 'reviewer' 
                ? 'Forward this video to Super QU for final approval.' 
                : 'Approve this video to complete the review process.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-center text-lg">
              Are you sure you want to {user?.role === 'reviewer' ? 'forward' : 'approve'} this video?
            </p>
            <div className="flex justify-center my-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircle className="h-10 w-10" />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>Cancel</Button>
            <Button 
              variant="default" 
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              {user?.role === 'reviewer' ? 'Forward Video' : 'Approve Video'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ReviewQueue;
