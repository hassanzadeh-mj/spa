import { ReactNode } from 'react';
import { Navbar } from "@/shared";
import AuthGuard from "@/shared/components/auth-guard";

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