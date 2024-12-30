import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSettings } from '../hooks/useSettings';

interface ThemeContextType {
  isDark: boolean;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { settings, updateSettings } = useSettings();
  const [isDark, setIsDark] = useState(false);

  // Get the current theme from settings
  const theme = settings?.theme || 'system';

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        setIsDark(mediaQuery.matches);
      }
    };

    // Initial setup
    if (theme === 'system') {
      setIsDark(mediaQuery.matches);
    } else {
      setIsDark(theme === 'dark');
    }

    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Update document class when dark mode changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const setTheme = async (newTheme: 'light' | 'dark' | 'system') => {
    await updateSettings({ theme: newTheme });
    if (newTheme === 'system') {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } else {
      setIsDark(newTheme === 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}