import { useState, useEffect } from 'react';

/**
 * Custom hook for theme management with localStorage persistence and system theme detection
 */
export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('onuz_theme');
      if (saved !== null) return saved === 'dark';
    } catch {
      // Use the operating system preference when browser storage is unavailable.
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    try {
      localStorage.setItem('onuz_theme', darkMode ? 'dark' : 'light');
    } catch {
      // The theme still applies for this session if storage is unavailable.
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark', 'dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark', 'dark-mode');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return { darkMode, setDarkMode, toggleTheme };
}
