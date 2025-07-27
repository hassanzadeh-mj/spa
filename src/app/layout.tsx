import { ReactNode } from 'react';
import './globals.css';
import ThemeProvider from '@/components/theme-provider';

interface RootLayoutProps {
  children: ReactNode;
  dashboard?: ReactNode;
}

export default function RootLayout({ children, dashboard }: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-background text-foreground transition-colors font-sans">
        <ThemeProvider>
          {dashboard || children}
        </ThemeProvider>
      </body>
    </html>
  );
}