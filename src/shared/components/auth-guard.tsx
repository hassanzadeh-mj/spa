'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // بررسی وجود کاربر در localStorage
    const storedUser = localStorage.getItem('user');
    
    if (!user && !storedUser) {
      router.push('/login');
    } else if (!user && storedUser) {
      // اگر کاربر در localStorage وجود دارد اما در store نیست، آن را اضافه کن
      useAuthStore.getState().login(storedUser);
    }
  }, [user, router]);

  // اگر کاربر لاگین نکرده، هیچ چیز نمایش نده
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center transition-colors rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground font-medium">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 