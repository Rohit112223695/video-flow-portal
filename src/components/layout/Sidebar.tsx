
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Upload, Film, CheckCheck, Settings, 
  LogOut, History, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleSidebar = () => setExpanded(!expanded);
  const closeSidebar = () => setExpanded(false);

  const getNavItems = () => {
    const items = [
      {
        path: '/dashboard',
        icon: <LayoutDashboard size={22} />,
        label: 'Dashboard',
        visible: true,
      },
    ];

    if (user?.role === 'collector') {
      items.push(
        {
          path: '/upload',
          icon: <Upload size={22} />,
          label: 'Upload',
          visible: true,
        },
        {
          path: '/my-videos',
          icon: <Film size={22} />,
          label: 'My Videos',
          visible: true,
        }
      );
    }

    if (user?.role === 'reviewer' || user?.role === 'superqc') {
      items.push({
        path: '/review-queue',
        icon: <CheckCheck size={22} />,
        label: 'Review Queue',
        visible: true,
      });
      
      items.push({
        path: '/review-history',
        icon: <History size={22} />,
        label: 'Review History',
        visible: true,
      });
    }

    items.push({
      path: '/settings',
      icon: <Settings size={22} />,
      label: 'Settings',
      visible: true,
    });

    return items;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      closeSidebar();
    }
  };

  const navItems = getNavItems();

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-card border-r z-40 transition-all duration-300 shadow-lg",
          expanded || !isMobile ? "w-64" : "w-16"
        )}
      >
        <div className="flex items-center h-16 px-4 border-b">
          {(expanded || !isMobile) && (
            <h1 className="text-lg font-bold">VideoFlow</h1>
          )}
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn(
                "md:hidden",
                !expanded && "mx-auto"
              )}
            >
              {expanded ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
        <div className="flex flex-col h-[calc(100%-64px)] p-2 justify-between">
          <nav className="space-y-1">
            {navItems.filter(item => item.visible).map(item => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  expanded || !isMobile ? "px-4" : "px-0 justify-center"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                {item.icon}
                {(expanded || !isMobile) && (
                  <span className="ml-2">{item.label}</span>
                )}
              </Button>
            ))}
          </nav>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start mt-auto",
              expanded || !isMobile ? "px-4" : "px-0 justify-center"
            )}
            onClick={logout}
          >
            <LogOut size={22} />
            {(expanded || !isMobile) && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
      {/* Overlay for mobile */}
      {expanded && isMobile && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={closeSidebar}
        />
      )}
      <div 
        className={cn(
          "w-16 md:w-64 flex-shrink-0 transition-all duration-300",
          expanded && isMobile && "w-64"
        )}
      />
    </>
  );
};

export default Sidebar;
