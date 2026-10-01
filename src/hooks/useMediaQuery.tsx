import { useEffect, useState } from 'react';

/**
 * Whether `query` matches. Always `false` on the server and for the first client render, so the
 * markup matches what Gatsby pre-rendered; the real answer arrives right after hydration.
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};
