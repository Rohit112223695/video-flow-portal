
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent={true} />
      
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY1aC0xdi01em0yIDBo1XYtMXptLTIgNmg1djFoLTV2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="max-w-4xl mx-auto z-10 animate-fade-in">
          <div className="mb-8 inline-flex p-4 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-indigo-100 dark:border-indigo-900/50">
            <span className="px-3 py-1 bg-primary/10 rounded-full">Next-Gen Video Processing</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Streamlined Video Review Workflow
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Collect, review, and validate videos with our intelligent AI-powered platform designed for maximum efficiency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl">
              <a href="#features">Learn More</a>
            </Button>
          </div>
          <div className="mt-16 hidden md:block">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="relative overflow-hidden rounded-xl border shadow-xl">
                <img src="https://placehold.co/1200x600/f5f8ff/b3b3b3?text=Video+Flow+Platform" alt="Platform preview" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="bg-background py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Role-Based Platform
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored For Everyone In Your Workflow</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive system serves everyone in your video processing pipeline
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-2xl p-6 hover:shadow-lg transition-all group border border-border/40">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-500 transition-colors">Data Collectors</h3>
              <p className="text-muted-foreground mb-4">
                Upload videos, track processing status, and respond to feedback seamlessly.
              </p>
              <ul className="space-y-2">
                {['Easy drag-and-drop uploads', 'Status tracking', 'Feedback management'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 hover:shadow-lg transition-all group border border-border/40">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors">Reviewers</h3>
              <p className="text-muted-foreground mb-4">
                Review videos in a prioritized queue and provide detailed feedback.
              </p>
              <ul className="space-y-2">
                {['Organized review queue', 'Time tracking', 'Standardized review tools'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 hover:shadow-lg transition-all group border border-border/40">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition-colors">Super QU</h3>
              <p className="text-muted-foreground mb-4">
                Provide final quality approvals and maintain quality standards.
              </p>
              <ul className="space-y-2">
                {['Final approval workflow', 'Quality metrics dashboard', 'Review history access'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-card rounded-2xl p-6 hover:shadow-lg transition-all group border border-border/40">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-500/20 to-red-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-rose-500 transition-colors">Administrators</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive overview of all operations with detailed analytics.
              </p>
              <ul className="space-y-2">
                {['Complete system overview', 'User management', 'Advanced reporting'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined workflow ensures efficient video processing from upload to final approval
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-card rounded-2xl p-6 border border-border/40 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 rounded-full text-white flex items-center justify-center font-bold">1</div>
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4 4 4-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Upload</h3>
              <p className="text-muted-foreground">
                Data collectors upload videos through our intuitive interface. AI preprocessing and validation ensure quality standards.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 border border-border/40 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-600 rounded-full text-white flex items-center justify-center font-bold">2</div>
              <div className="h-12 w-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="m22 9-4 3 4 3Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Review</h3>
              <p className="text-muted-foreground">
                Reviewers assess videos in a prioritized queue, providing detailed feedback or approval for the next step.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 border border-border/40 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-600 rounded-full text-white flex items-center justify-center font-bold">3</div>
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Approve</h3>
              <p className="text-muted-foreground">
                Super QU makes the final quality assessment, ensuring all videos meet the required standards before completion.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 -z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY1aC0xdi01em0yIDBo5XYtMXptLTIgNmg1djFoLTV2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Streamline Your Video Workflow?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of teams already using VideoFlow for efficient video processing and quality assurance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0">
              <Link to="/login">Get Started Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl border-primary/30 hover:bg-primary/10">
              <a href="#features">See Features</a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted/50 py-10 px-4 md:px-6 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                </div>
                <span className="text-xl font-bold">VideoFlow</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Streamlining video workflows since 2023
              </p>
            </div>
            
            <div className="flex gap-10">
              <div>
                <h4 className="font-medium mb-3">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">Features</a></li>
                  <li><a href="#" className="hover:text-primary">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">About</a></li>
                  <li><a href="#" className="hover:text-primary">Careers</a></li>
                  <li><a href="#" className="hover:text-primary">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground order-2 md:order-1">
              &copy; {new Date().getFullYear()} VideoFlow Portal. All rights reserved.
            </div>
            
            <div className="flex space-x-6 mb-4 md:mb-0 order-1 md:order-2">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
