
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ApproveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  isReviewer: boolean;
}

export function ApproveDialog({
  open,
  onOpenChange,
  onApprove,
  isReviewer,
}: ApproveDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ThumbsUp className="h-5 w-5 mr-2 text-green-500" />
            {isReviewer ? 'Forward Video' : 'Approve Video'}
          </DialogTitle>
          <DialogDescription>
            {isReviewer 
              ? 'Forward this video to Super QC for final approval.' 
              : 'Approve this video to complete the review process.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-center text-lg">
            Are you sure you want to {isReviewer ? 'forward' : 'approve'} this video?
          </p>
          <div className="flex justify-center my-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              <CheckCircle className="h-10 w-10" />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            variant="default" 
            onClick={onApprove}
            className="bg-green-600 hover:bg-green-700 gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            {isReviewer ? 'Forward Video' : 'Approve Video'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
