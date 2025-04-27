
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { VideoUploader } from '@/components/upload/VideoUploader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Upload = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Upload Video</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoUploader />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Guidelines</CardTitle>
                <CardDescription>Follow these guidelines for successful uploads</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <svg className="h-3 w-3 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <span>Videos must be in MP4, MOV, or AVI format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <svg className="h-3 w-3 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <span>Maximum file size is 2GB</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <svg className="h-3 w-3 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <span>Resolution should be at least 720p (HD)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <svg className="h-3 w-3 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <span>Audio should be clear and properly synchronized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <svg className="h-3 w-3 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <span>Include descriptive title and details</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>After Upload</CardTitle>
                <CardDescription>What happens next</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">AI Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Our system will automatically analyze your video for quality assurance.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Human Review</h4>
                    <p className="text-sm text-muted-foreground">
                      A reviewer will manually check your submission.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">QU Approval</h4>
                    <p className="text-sm text-muted-foreground">
                      Final quality check before approval or rejection.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Consent & Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an OTP for verification and consent form.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Upload;
