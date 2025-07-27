'use client';

import { useAuthStore } from '@/store/auth';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const getPageTitle = () => {
    // Check for dynamic server pages
    if (pathname.startsWith('/servers/') && pathname !== '/servers') {
      return 'Server Details';
    }
    
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/servers':
        return 'Servers';
      case '/resources':
        return 'Resources';
      case '/users':
        return 'Users';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-card shadow-sm border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-foreground transition-colors font-sans">
              {getPageTitle()}
            </h1>
            {user && (
              <span className="ml-4 text-sm text-muted-foreground transition-colors font-medium">
                Welcome, {user}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground transition-colors font-medium">System Online</span>
            </div>
            
            <div className="text-sm text-muted-foreground transition-colors font-medium">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 