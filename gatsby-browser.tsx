import React from 'react';
import { ThemeProvider } from './src/hooks/themeContext';
import './src/styles/global.scss';
import 'gatsby-remark-vscode/styles.css';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
