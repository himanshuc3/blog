// Kept apart from oneko.ts so `gatsby-browser` can decide whether to fetch the cat's chunk at all.

/** Hover-capable fine pointer and a desktop-width viewport (phones and tablets get no cat). */
const DESKTOP_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px)';

/** True when the cat should run: desktop only, and never with reduced motion. Browser-only. */
export const canRunOneko = (): boolean =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  window.matchMedia(DESKTOP_QUERY).matches;
