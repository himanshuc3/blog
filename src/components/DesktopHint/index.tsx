import React, { useEffect, useState } from 'react';
import { FiMonitor, FiX } from 'react-icons/fi';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import './styles.scss';

const STORAGE_KEY = 'desktop-hint-dismissed';
// Phones and small tablets. Keep in step with `md` in styles/_responsive.scss.
const SMALL_SCREEN = '(max-width: 768px)';

// Storage can throw (private mode, blocked cookies); the hint just shows again if it does.
const wasDismissed = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};
const rememberDismissed = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
};

/**
 * A small dismissible badge telling visitors on small screens that the site looks best on a
 * desktop. Hidden until the client knows the screen size, so it never appears in pre-rendered HTML.
 * Dismissing it lasts for the rest of the session.
 */
const DesktopHint: React.FC = () => {
  const isSmallScreen = useMediaQuery(SMALL_SCREEN);
  // Start dismissed so nothing renders until we've read storage on the client.
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(wasDismissed());
  }, []);

  if (!isSmallScreen || dismissed) return null;

  const dismiss = () => {
    rememberDismissed();
    setDismissed(true);
  };

  return (
    <aside className="desktop-hint" role="status">
      <FiMonitor className="desktop-hint__icon" aria-hidden="true" />
      <p className="desktop-hint__text">Looks best on desktop</p>
      <button type="button" className="desktop-hint__close" onClick={dismiss} aria-label="Dismiss">
        <FiX aria-hidden="true" />
      </button>
    </aside>
  );
};

export default DesktopHint;
