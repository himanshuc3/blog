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
    
    // No saved preference: dark is the default, whatever the system says.
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

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
  setHeadComponents([
    React.createElement('script', {
      key: 'theme-script',
      dangerouslySetInnerHTML: {
        __html: themeScript,
      },
    }),
    // GoatCounter analytics: cookieless, ~3.5 KB, production builds only. It counts the first page
    // load itself; later client-side navigations are counted in gatsby-browser.tsx.
    ...(process.env.NODE_ENV === 'production'
      ? [
          React.createElement('script', {
            key: 'goatcounter',
            async: true,
            src: 'https://gc.zgo.at/count.js',
            'data-goatcounter': 'https://dumbriyani.goatcounter.com/count',
          }),
        ]
      : []),
  ]);
};

export const wrapRootElement = ({ element }) => {
  return element;
}; 