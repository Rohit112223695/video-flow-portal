
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';

const Header: React.FC<{ transparent?: boolean }> = ({ transparent = false }) => {
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-10 transition-all duration-300 ${
      transparent ? 'bg-transparent' : 'bg-white dark:bg-gray-900 border-b'
    }`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
          </div>
          <span className={`text-xl font-bold ${transparent ? 'text-white' : 'text-gray-800 dark:text-white'}`}>VideoFlow</span>
        </Link>
        
        <nav>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm text-muted-foreground">
                  {user?.role && user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-destructive flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
