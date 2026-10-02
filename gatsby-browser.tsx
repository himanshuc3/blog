import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import { canRunOneko } from './src/components/Oneko/canRun';
import { saveDataOn, whenPageIdle } from './src/utils/idle';
import { ThemeProvider } from './src/hooks/themeContext';
import './src/styles/global.scss';

export const wrapRootElement = ({ element }:{element:  React.ReactElement}) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};

// GoatCounter counts the first load on its own; count each client-side navigation after that.
export const onRouteUpdate = ({
  location,
  prevLocation,
}: {
  location: Location;
  prevLocation: Location | null;
}) => {
  if (!prevLocation) return;
  (window as unknown as { goatcounter?: { count?: (vars: { path: string }) => void } }).goatcounter
    ?.count?.({ path: location.pathname + location.search });
};

// The sleeping cat is desktop-only, so phones never download its chunk (code + sprite), and desktops
// fetch it once the page has painted and gone idle. Not in `wrapRootElement`: Gatsby renders that a
// second time for each page's `Head`, which doubled the cat.
export const onInitialClientRender = () => {
  if (!canRunOneko() || saveDataOn()) return;
  whenPageIdle(() => {
    import('./src/components/Oneko/oneko').then(({ startOneko }) => startOneko());
  });
};
