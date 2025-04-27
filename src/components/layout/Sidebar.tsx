
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { 
  Layout, Video, FileCheck, Users, Database, 
  Clock, Settings, Upload, ChartBar 
} from 'lucide-react';

type SidebarLink = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  roles: UserRole[];
};

const links: SidebarLink[] = [
  {
    title: 'Dashboard',
    icon: Layout,
    href: '/dashboard',
    roles: ['collector', 'reviewer', 'superqu', 'admin'],
  },
  {
    title: 'Upload Video',
    icon: Upload,
    href: '/upload',
    roles: ['collector'],
  },
  {
    title: 'My Videos',
    icon: Video,
    href: '/my-videos',
    roles: ['collector'],
  },
  {
    title: 'Review Queue',
    icon: Clock,
    href: '/review-queue',
    roles: ['reviewer', 'superqu'],
  },
  {
    title: 'Review History',
    icon: FileCheck,
    href: '/review-history',
    roles: ['reviewer', 'superqu'],
  },
  {
    title: 'Analytics',
    icon: ChartBar,
    href: '/analytics',
    roles: ['reviewer', 'superqu', 'admin'],
  },
  {
    title: 'Users',
    icon: Users,
    href: '/users',
    roles: ['admin'],
  },
  {
    title: 'Database',
    icon: Database,
    href: '/database',
    roles: ['admin'],
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
    roles: ['collector', 'reviewer', 'superqu', 'admin'],
  },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Filter links based on user role
  const filteredLinks = links.filter(link => 
    user?.role && link.roles.includes(user.role)
  );

  if (!user) return null;

  return (
    <aside className="w-16 md:w-64 h-screen fixed left-0 top-0 bg-sidebar border-r border-sidebar-border flex flex-col transition-all">
      <div className="h-16 flex items-center justify-center md:justify-start px-4 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
          </div>
          <span className="text-xl font-bold text-sidebar-foreground hidden md:inline">VideoFlow</span>
        </Link>
      </div>
      
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {filteredLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-foreground font-medium"
                  )}
                >
                  <link.icon className={cn("w-5 h-5", isActive ? "text-sidebar-primary" : "")} />
                  <span className="hidden md:inline">{link.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className={`w-3 h-3 rounded-full bg-video-${user.role}`}></div>
          <span className="text-sm text-sidebar-foreground/80 hidden md:inline">
            {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
