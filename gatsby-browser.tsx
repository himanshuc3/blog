import React from 'react';
import { ThemeProvider } from './src/hooks/themeContext';
import './src/styles/global.scss';
require('prismjs/themes/prism-solarizedlight.css');
require('prismjs/plugins/line-numbers/prism-line-numbers.css');

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
