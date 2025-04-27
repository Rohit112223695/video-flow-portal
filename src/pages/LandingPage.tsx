
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
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto z-10 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Streamlined Video Processing & Review Platform
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Collect, review, and approve videos through our intelligent workflow system designed for quality assurance teams.
          </p>
          <Button asChild size="lg" className="px-8 py-6 text-lg">
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-background py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Role-Based Platform for Every Need</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive system serves everyone in your video processing workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-card p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-video-collector/20 text-video-collector flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Data Collectors</h3>
              <p className="text-muted-foreground mb-4">
                Upload videos, track processing status, and respond to feedback seamlessly.
              </p>
              <ul className="space-y-2">
                {['Easy drag-and-drop uploads', 'Status tracking', 'Feedback management'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-card p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-video-reviewer/20 text-video-reviewer flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Reviewers</h3>
              <p className="text-muted-foreground mb-4">
                Review videos in a prioritized queue and provide detailed feedback.
              </p>
              <ul className="space-y-2">
                {['Organized review queue', 'Time tracking', 'Standardized review tools'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-card p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-video-superqu/20 text-video-superqu flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Super QU</h3>
              <p className="text-muted-foreground mb-4">
                Provide final quality approvals and maintain quality standards.
              </p>
              <ul className="space-y-2">
                {['Final approval workflow', 'Quality metrics dashboard', 'Review history access'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-card p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-video-admin/20 text-video-admin flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Administrators</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive overview of all operations with detailed analytics.
              </p>
              <ul className="space-y-2">
                {['Complete system overview', 'User management', 'Advanced reporting'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/10 py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your Video Workflow?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of teams already using VideoFlow for efficient video processing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/login">Sign In Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted py-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                </div>
                <span className="text-xl font-bold">VideoFlow</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Streamlining video workflows since 2023
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} VideoFlow Portal. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
