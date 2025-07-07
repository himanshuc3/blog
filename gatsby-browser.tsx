import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import { ThemeProvider } from './src/hooks/themeContext';
import './src/styles/global.scss';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
