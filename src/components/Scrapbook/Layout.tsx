import React from 'react';

import DesktopHint from '../DesktopHint';
import Nav from './Nav';
import './styles.scss';

/** Shared shell for scrapbook pages: the floating nav plus a scoped surface (light-only unless `noise`, which follows the site theme). */
const Layout: React.FC<{ children: React.ReactNode; noise?: boolean }> = ({
  children,
  noise = false,
}) => (
  <main className={`scrap${noise ? ' scrap--noise' : ''}`}>
    <Nav />
    <DesktopHint />
    {children}
  </main>
);

export default Layout;
