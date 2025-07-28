import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import './globals.css';

const ThemeProvider = dynamic(() => import('@/shared/components/theme-provider'), {
  loading: () => <div>Loading...</div>
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-background text-foreground transition-colors font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}