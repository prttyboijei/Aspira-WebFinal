import { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

const LIGHT_COLORS = {
  background: '#FFFFFF',
  surface: '#F7F5F0',
  text: '#0D1F3C',
  textSecondary: '#6B7A90',
  border: '#E8EBF0',
  sidebar: '#FFFFFF',
  sidebarText: '#0D1F3C',
  sidebarTextActive: '#0E8A7C',
  sidebarHover: '#F7F5F0',
  primary: '#0E8A7C',
  primaryHover: '#0D7A6D',
};

const DARK_COLORS = {
  background: '#0D1F3C',
  surface: '#1A3260',
  text: '#FFFFFF',
  textSecondary: '#B4C0D4',
  border: '#2A4480',
  sidebar: '#0D1F3C',
  sidebarText: '#B4C0D4',
  sidebarTextActive: '#12A898',
  sidebarHover: '#1A3260',
  primary: '#12A898',
  primaryHover: '#0E8A7C',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('aspira-theme');
    if (saved) return saved;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('aspira-theme', theme);
    const root = document.documentElement;
    
    const colors = theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
