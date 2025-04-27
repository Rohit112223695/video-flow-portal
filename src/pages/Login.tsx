
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to VideoFlow!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background to-muted">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Login to VideoFlow</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                
                <div className="bg-muted rounded-lg p-3 text-sm">
                  <strong>Demo accounts:</strong>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <div>📸 Data Collector</div>
                      <div className="text-xs text-muted-foreground">collector@example.com</div>
                    </div>
                    <div>
                      <div>🔍 Reviewer</div>
                      <div className="text-xs text-muted-foreground">reviewer@example.com</div>
                    </div>
                    <div>
                      <div>✓ Super QU</div>
                      <div className="text-xs text-muted-foreground">superqu@example.com</div>
                    </div>
                    <div>
                      <div>👑 Admin</div>
                      <div className="text-xs text-muted-foreground">admin@example.com</div>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Password for all: "password"</div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Sign In"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
