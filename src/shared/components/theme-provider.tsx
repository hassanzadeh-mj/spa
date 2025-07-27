'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDark } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = window.document.documentElement;
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [isDark, mounted]);

  // جلوگیری از hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
} 