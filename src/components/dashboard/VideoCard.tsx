
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  uploadDate: string;
  className?: string;
  onAction?: (id: string, action: string) => void;
}

export function VideoCard({ 
  id, 
  title, 
  thumbnail, 
  duration, 
  status, 
  uploadDate,
  className,
  onAction
}: VideoCardProps) {
  const { user } = useAuth();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500';
      case 'reviewing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-500';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-500';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };
  
  return (
    <Card className={cn("overflow-hidden h-full flex flex-col", className)}>
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <CardContent className="py-4 flex-grow">
        <h3 className="font-medium line-clamp-2 mb-2">{title}</h3>
        <div className="flex justify-between items-center">
          <Badge variant="outline" className={cn("text-xs font-normal", getStatusColor(status))}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <span className="text-xs text-muted-foreground">{uploadDate}</span>
        </div>
      </CardContent>
      
      {onAction && (user?.role === 'reviewer' || user?.role === 'superqu') && (
        <CardFooter className="pt-0 pb-4 px-4 gap-2">
          {status === 'pending' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onAction(id, 'review')}
            >
              Review
            </Button>
          )}
          {status === 'reviewing' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => onAction(id, 'reject')}
              >
                Reject
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                onClick={() => onAction(id, 'approve')}
              >
                {user?.role === 'reviewer' ? 'Forward' : 'Approve'}
              </Button>
            </>
          )}
        </CardFooter>
      )}
      
      {onAction && user?.role === 'collector' && (
        <CardFooter className="pt-0 pb-4 px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full"
            onClick={() => onAction(id, 'details')}
          >
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
