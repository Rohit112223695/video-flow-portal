
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, ChevronRight, FileCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

export function VideoUploader() {
  const [activeStep, setActiveStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
  
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          toast({
            title: "Upload Successful",
            description: "Your video has been uploaded and is being processed.",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeStep === 1 && videoFile) {
      setActiveStep(2);
    } else if (activeStep === 2 && videoTitle) {
      simulateUpload();
      setActiveStep(3);
    }
  };
  
  return (
    <Card className="max-w-2xl mx-auto border-0 shadow-md">
      <CardHeader>
        <CardTitle>Upload Video</CardTitle>
        <CardDescription>
          Upload your video for processing and review
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8 relative">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Select Video</span>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Add Details</span>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Upload</span>
            </div>
          </div>
          <div className="w-full h-1 bg-muted rounded-full">
            <div 
              className="h-1 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-10 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Drag and drop your video</h3>
              <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
              <Input 
                type="file" 
                id="videoFile" 
                className="hidden" 
                onChange={handleFileChange}
                accept="video/*"
              />
              <Button asChild>
                <Label htmlFor="videoFile">Select Video File</Label>
              </Button>
            </div>
            
            {videoFile && (
              <div className="flex items-center p-3 bg-muted rounded-lg">
                <FileCheck className="h-5 w-5 text-green-500 mr-2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{videoFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeStep === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoTitle">Video Title</Label>
              <Input
                id="videoTitle"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Enter a title for your video"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="videoDescription">Description (Optional)</Label>
              <Textarea
                id="videoDescription"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                placeholder="Add details about your video"
                rows={4}
              />
            </div>
          </form>
        )}
        
        {activeStep === 3 && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Upload Progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
            
            {uploadComplete && (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-lg flex items-start">
                <FileCheck className="h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Upload Complete</h4>
                  <p className="text-sm mt-1">
                    Your video has been uploaded successfully and is now being processed. You will be notified once it's ready for review.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {activeStep > 1 && (
          <Button 
            variant="ghost" 
            onClick={() => setActiveStep(prev => prev - 1)}
            disabled={isUploading || uploadComplete}
          >
            Back
          </Button>
        )}
        
        {activeStep < 3 && (
          <Button 
            onClick={handleSubmit}
            disabled={
              (activeStep === 1 && !videoFile) || 
              (activeStep === 2 && !videoTitle)
            }
            className="ml-auto"
          >
            Continue <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
        
        {activeStep === 3 && uploadComplete && (
          <Button onClick={() => {
            setActiveStep(1);
            setVideoFile(null);
            setVideoTitle('');
            setVideoDescription('');
            setUploadComplete(false);
          }}>
            Upload Another Video
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
