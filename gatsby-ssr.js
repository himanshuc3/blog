import React from 'react';

// Inline script to detect and apply theme immediately
const themeScript = `
(function() {
  function getInitialTheme() {
    // Check theme inside 
    const persistedTheme = window.localStorage.getItem('theme');
    const hasPersistedTheme = typeof persistedTheme === 'string';
    
    // If user has a saved preference, use it
    if (hasPersistedTheme) {
      return ['dark', 'light'].includes(persistedTheme) ? persistedTheme : 'dark';
    }
    
    // Otherwise, check system preference
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }
    
    // Default to dark theme
    return 'dark';
  }
  
  const theme = getInitialTheme();
  
  // Apply theme class immediately
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Store the theme for React to pick up
  window.__theme = theme;
})();
`;

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('script', {
      key: 'theme-script',
      dangerouslySetInnerHTML: {
        __html: themeScript,
      },
    }),
  ]);
};

export const wrapRootElement = ({ element }) => {
  return element;
}; 