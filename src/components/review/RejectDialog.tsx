
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ThumbsDown, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  rejectionCategory: string;
  setRejectionCategory: (category: string) => void;
  onReject: () => void;
}

export function RejectDialog({
  open,
  onOpenChange,
  rejectionReason,
  setRejectionReason,
  rejectionCategory,
  setRejectionCategory,
  onReject,
}: RejectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            variant="destructive" 
            onClick={onReject}
            className="gap-2"
          >
            <XCircle className="h-4 w-4" />
            Reject Video
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
