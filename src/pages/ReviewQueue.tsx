
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
import { 
  ThumbsDown, 
  ThumbsUp, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  History 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  
  // Mock review history data
  const reviewHistory = [
    { id: 'h1', videoTitle: 'Street Interview in Central Park', date: '2025-04-18', action: 'Approved', comments: 'Good quality content' },
    { id: 'h2', videoTitle: 'Product Unboxing - New Smartphone', date: '2025-04-17', action: 'Rejected', comments: 'Poor audio quality' },
    { id: 'h3', videoTitle: 'City Tour - Downtown Area', date: '2025-04-15', action: 'Approved', comments: 'Excellent coverage' },
    { id: 'h4', videoTitle: 'Local Business Profile', date: '2025-04-12', action: 'Rejected', comments: 'Lighting issues' },
    { id: 'h5', videoTitle: 'Tech Conference Highlights', date: '2025-04-10', action: 'Approved', comments: 'Good content' },
  ];
  
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
        video.status = 'reviewing';
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
    
    // Update video status
    videoInReview.status = 'rejected';
    
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
    
    // Update video status based on role
    if (user?.role === 'reviewer') {
      videoInReview.status = 'reviewing'; // Marked for Super QC review
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="history">Review History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="queue" className="space-y-6">
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
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <History className="h-8 w-8" />
              Review History
            </h1>
            <Input
              type="text"
              placeholder="Search history..."
              className="w-full max-w-xs"
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Comments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviewHistory.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.videoTitle}</TableCell>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        review.action === 'Approved' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {review.action}
                      </span>
                    </TableCell>
                    <TableCell>{review.comments}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="h-8 w-8" />
              Review Analytics
            </h1>
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-sm font-medium text-muted-foreground">Total Reviewed</h3>
                <div className="text-2xl font-bold">127</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-sm font-medium text-muted-foreground">Approved</h3>
                <div className="text-2xl font-bold text-green-600">98</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-sm font-medium text-muted-foreground">Rejected</h3>
                <div className="text-2xl font-bold text-red-600">29</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-sm font-medium text-muted-foreground">Review Rate</h3>
                <div className="text-2xl font-bold">12.3/day</div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Review Activity</h3>
            <div className="h-80 flex items-center justify-center border-b pb-4">
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 mb-2 opacity-30" />
                <p>Chart visualization would appear here</p>
                <p className="text-sm">Showing review activity over time</p>
              </div>
            </div>
            <div className="pt-4 flex justify-between text-sm text-muted-foreground">
              <div>Apr 20</div>
              <div>Apr 25</div>
              <div>Apr 30</div>
              <div>May 5</div>
              <div>May 10</div>
              <div>May 15</div>
              <div>May 20</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
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
                ? 'Forward this video to Super QC for final approval.' 
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
