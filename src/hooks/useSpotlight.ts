import { useEffect, RefObject } from 'react';

/**
 * Writes the pointer position (relative to `ref`) into the `--mx` / `--my` CSS variables so a
 * stylesheet can paint a spotlight that follows the cursor. No-ops for touch and reduced motion.
 */
export function useSpotlight<T extends HTMLElement>(ref: RefObject<T>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const canHover = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)');
    if (!canHover.matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        el.style.setProperty('--my', `${e.clientY - rect.top}px`);
        el.style.setProperty('--spot', '1');
      });
    };
    const onLeave = () => el.style.setProperty('--spot', '0');

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref]);
}
