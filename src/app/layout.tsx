import { ReactNode } from 'react';
import './globals.css';
import ThemeProvider from '@/shared/components/theme-provider';

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