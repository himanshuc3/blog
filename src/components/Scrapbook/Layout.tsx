import React from 'react';

import Nav from './Nav';
import './styles.scss';

/** Shared shell for scrapbook pages: the floating nav plus a scoped surface (light-only unless `noise`, which follows the site theme). */
const Layout: React.FC<{ children: React.ReactNode; noise?: boolean }> = ({
  children,
  noise = false,
}) => (
  <main className={`scrap${noise ? ' scrap--noise' : ''}`}>
    <Nav />
    {children}
  </main>
);

export default Layout;
