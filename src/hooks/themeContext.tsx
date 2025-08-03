import React, { useState, createContext, ReactNode, useEffect } from 'react';

interface ContextProps {
  darkTheme: boolean;
  toggleTheme: () => void;
  isHydrated: boolean;
}

// Useless, because controlled by in function state
export const ThemeContext = createContext<ContextProps>({
  darkTheme: true,
  toggleTheme: () => {},
  isHydrated: false,
});

interface Props {
  children: ReactNode;
}

// Helper function to get initial theme
function getInitialTheme(): boolean {
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Sync state with what's already applied to DOM
    const isDarkMode = document.documentElement.classList.contains('dark');

    // Only update state if it doesn't match current DOM state
    if (darkTheme !== isDarkMode) {
      setDarkTheme(isDarkMode);
    }

    // Ensure localStorage is in sync
    const storedTheme = localStorage.getItem('theme');
    const expectedTheme = isDarkMode ? 'dark' : 'light';
    if (storedTheme !== expectedTheme) {
      localStorage.setItem('theme', expectedTheme);
    }

    // Mark as hydrated
    setIsHydrated(true);
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
        isHydrated: isHydrated,
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
