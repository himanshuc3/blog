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

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const isDarkTheme = theme ? theme === 'dark' : true;
    setDarkTheme(isDarkTheme);
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleThemeHandler = () => {
    document.documentElement.classList.toggle('dark');
    setDarkTheme((prevState) => !prevState);
    setTimeout(() => {
      localStorage.setItem('theme', darkTheme ? 'light' : 'dark');
    }, 0);
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
