import React from 'react';

import Nav from './Nav';
import './styles.scss';

/** Shared shell for scrapbook pages: the floating nav plus a light-only, scoped surface. */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="scrap">
    <Nav />
    {children}
  </main>
);

export default Layout;
