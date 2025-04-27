
import React from 'react';
import { Input } from '@/components/ui/input';
import { History } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReviewHistoryItem {
  id: string;
  videoTitle: string;
  date: string;
  action: string;
  comments: string;
}

interface ReviewHistoryProps {
  history: ReviewHistoryItem[];
}

export function ReviewHistory({ history }: ReviewHistoryProps) {
  return (
    <div className="space-y-6">
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
            {history.map((review) => (
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
    </div>
  );
}
