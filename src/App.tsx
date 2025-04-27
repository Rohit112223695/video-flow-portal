
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import MyVideos from "./pages/MyVideos";
import ReviewQueue from "./pages/ReviewQueue";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ 
  children, 
  allowedRoles = null 
}: { 
  children: React.ReactNode; 
  allowedRoles?: string[] | null;
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // While checking auth status, show nothing or a loading indicator
  if (isLoading) return null;
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  // If roles are specified, check if user has permission
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/upload" 
              element={
                <ProtectedRoute allowedRoles={['collector']}>
                  <Upload />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-videos" 
              element={
                <ProtectedRoute allowedRoles={['collector']}>
                  <MyVideos />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/review-queue" 
              element={
                <ProtectedRoute allowedRoles={['reviewer', 'superqu']}>
                  <ReviewQueue />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
