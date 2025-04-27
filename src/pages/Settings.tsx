
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    newVideo: true,
    reviewComplete: true,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications]
    });
  };

  const saveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const saveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={profileData.name} 
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={profileData.email} 
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input 
                    id="avatar" 
                    name="avatar"
                    value={profileData.avatar} 
                    onChange={handleProfileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a URL for your profile picture
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="font-medium">Notification Channels</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationToggle('email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Show notifications in your browser
                      </p>
                    </div>
                    <Switch 
                      id="browser-notifications" 
                      checked={notifications.browser}
                      onCheckedChange={() => handleNotificationToggle('browser')}
                    />
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <div className="font-medium">When to Notify</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-video">New Video Uploaded</Label>
                      <p className="text-sm text-muted-foreground">
                        When a new video is ready for review
                      </p>
                    </div>
                    <Switch 
                      id="new-video" 
                      checked={notifications.newVideo}
                      onCheckedChange={() => handleNotificationToggle('newVideo')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="review-complete">Review Complete</Label>
                      <p className="text-sm text-muted-foreground">
                        When your video has been reviewed
                      </p>
                    </div>
                    <Switch 
                      id="review-complete" 
                      checked={notifications.reviewComplete}
                      onCheckedChange={() => handleNotificationToggle('reviewComplete')}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveNotifications}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
