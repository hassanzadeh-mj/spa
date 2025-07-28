import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/shared').then(module => ({ default: module.Navbar })), {
  loading: () => <div>Loading navbar...</div>
});

const AuthGuard = dynamic(() => import('@/shared/components/auth-guard'), {
  loading: () => <div>Loading...</div>
});

interface DashboardLayoutProps {
  children: ReactNode;
  header: ReactNode;
}

export default function DashboardLayout({ children, header }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background transition-colors rtl">
        <Navbar />
        {header}
        <main className="p-6">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
} 