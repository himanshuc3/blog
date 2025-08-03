import React, { useState, createContext, ReactNode, useEffect } from 'react';

interface ContextProps {
  darkTheme: boolean;
  toggleTheme: () => void;
}

// Useless, because controlled by in function state
export const ThemeContext = createContext<ContextProps>({
  darkTheme: true,
  toggleTheme: () => {},
});

interface Props {
  children: ReactNode;
}

// Helper function to get initial theme
function getInitialTheme(): boolean {
  console.log('🎨 getInitialTheme called!'); // You'll see this only once
  // Check if we're in browser environment
  if (typeof window !== 'undefined') {
    // Check if theme was pre-applied by our inline script
    if (window.__theme) {
      return window.__theme === 'dark';
    }

    // Fallback to localStorage check
    const theme = localStorage.getItem('theme');
    if (theme) {
      return theme === 'dark';
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
  }

  // Default to dark theme
  return true;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Sync state with what's already applied to DOM
    const isDarkMode = document.documentElement.classList.contains('dark');

    setDarkTheme(isDarkMode);

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, []);

  const toggleThemeHandler = () => {
    const newTheme = !darkTheme;

    // Update DOM
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update state
    setDarkTheme(newTheme);

    // Update localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        darkTheme: darkTheme,
        toggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

// Type declaration for the global theme variable
declare global {
  interface Window {
    __theme: string;
  }
}
