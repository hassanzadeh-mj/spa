'use client';

import { useAuthStore } from '@/store/auth';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const getPageTitle = () => {
    // Check for dynamic server pages
    if (pathname.startsWith('/servers/') && pathname !== '/servers') {
      return 'جزئیات سرور';
    }
    
    switch (pathname) {
      case '/':
        return 'داشبورد';
      case '/servers':
        return 'سرورها';
      case '/resources':
        return 'منابع';
      case '/users':
        return 'کاربران';
      default:
        return 'داشبورد';
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('fa-IR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-card shadow-sm border-b border-border transition-colors rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-foreground transition-colors font-sans">
              {getPageTitle()}
            </h1>
            {user && (
              <span className="mr-4 text-sm text-muted-foreground transition-colors font-medium">
                خوش آمدید، {user}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground transition-colors font-medium">سیستم آنلاین</span>
            </div>
            
            <div className="text-sm text-muted-foreground transition-colors font-medium">
              {getCurrentDate()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 