
// Mock data for the application

export const mockVideos = [
  {
    id: "v1",
    title: "Street Interview in Central Park",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    duration: "12:34",
    status: "pending",
    uploadDate: "2025-04-22",
    uploader: "1",
    description: "Interviews with visitors at Central Park about their experiences."
  },
  {
    id: "v2",
    title: "Product Unboxing - New Smartphone",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    duration: "08:12",
    status: "reviewing",
    uploadDate: "2025-04-20",
    uploader: "1",
    description: "Detailed unboxing and first impressions of the latest smartphone."
  },
  {
    id: "v3",
    title: "City Tour - Downtown Area",
    thumbnail: "https://images.unsplash.com/photo-1618944913480-b67ee16d7b85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    duration: "24:18",
    status: "approved",
    uploadDate: "2025-04-15",
    uploader: "1",
    description: "Walking tour through the downtown area, highlighting key attractions."
  },
  {
    id: "v4",
    title: "Local Business Profile - Joe's Bakery",
    thumbnail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    duration: "15:42",
    status: "rejected",
    uploadDate: "2025-04-12",
    uploader: "1",
    description: "Profile of a local bakery, featuring an interview with the owner."
  },
  {
    id: "v5",
    title: "Tech Conference Highlights",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    duration: "18:03",
    status: "pending",
    uploadDate: "2025-04-10",
    uploader: "1",
    description: "Coverage of the annual tech conference with key highlights and demos."
  },
  {
    id: "v6",
    title: "Home Cooking Tutorial",
    thumbnail: "https://images.unsplash.com/photo-1627483262769-04d0a1401487?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    duration: "32:17",
    status: "reviewing",
    uploadDate: "2025-04-05",
    uploader: "1",
    description: "Step-by-step tutorial for preparing a 3-course meal at home."
  },
  {
    id: "v7",
    title: "Local Festival Coverage",
    thumbnail: "https://images.unsplash.com/photo-1603208644523-65689748696b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    duration: "27:44",
    status: "approved",
    uploadDate: "2025-03-30",
    uploader: "1",
    description: "Coverage of the annual local cultural festival and events."
  },
  {
    id: "v8",
    title: "New Shopping Mall Tour",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    duration: "14:29",
    status: "pending",
    uploadDate: "2025-03-28",
    uploader: "1",
    description: "Tour of the newly opened shopping mall with store highlights."
  }
];

export const mockTrendData = [
  { name: "Jan", pending: 12, reviewing: 18, approved: 30 },
  { name: "Feb", pending: 15, reviewing: 20, approved: 28 },
  { name: "Mar", pending: 20, reviewing: 15, approved: 32 },
  { name: "Apr", pending: 18, reviewing: 25, approved: 35 },
  { name: "May", pending: 25, reviewing: 22, approved: 40 },
  { name: "Jun", pending: 22, reviewing: 18, approved: 42 },
  { name: "Jul", pending: 18, reviewing: 15, approved: 45 },
];

export const mockUsers = [
  { id: "u1", name: "John Smith", role: "collector", videos: 24, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john" },
  { id: "u2", name: "Sarah Johnson", role: "collector", videos: 18, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
  { id: "u3", name: "Michael Brown", role: "collector", videos: 32, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael" },
  { id: "u4", name: "Lisa Davis", role: "reviewer", videos: 142, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa" },
  { id: "u5", name: "James Wilson", role: "reviewer", videos: 98, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james" },
  { id: "u6", name: "Linda Taylor", role: "superqu", videos: 215, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=linda" },
  { id: "u7", name: "Robert Miller", role: "superqu", videos: 189, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert" },
  { id: "u8", name: "Patricia Moore", role: "admin", videos: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=patricia" },
];
