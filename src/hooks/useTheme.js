import { useState, useEffect } from 'react';

/**
 * Custom hook for theme management with localStorage persistence and system theme detection
 */
export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('onuz_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('onuz_theme', darkMode ? 'dark' : 'light');
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
