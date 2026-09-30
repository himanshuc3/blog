import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

import sheet from '../../images/cat-spritesheet.webp';
import { CAT_GAZE } from './catGaze';

// Sheet layout, from cat-spritesheet.json.
const COLS = 14;
const ROWS = 14;
const FRAME_COUNT = 193;
const FPS = 24;
const FRAME_W = 320;
const FRAME_H = 480;

// Where the eyes sit in a frame (the neutral frame's gaze), as fractions of its size.
const HEAD = { x: 165 / FRAME_W, y: 100 / FRAME_H };
// How far the pupils travel in the sheet, in frame px: [left, right] and [up, down].
const REACH_X = [49, 40] as const;
const REACH_Y = [12, 24] as const;
// Cursor distance (as a fraction of the viewport) at which the cat is looking at its limit.
const RANGE = 0.35;
// Per-frame easing toward the cursor. Higher is snappier.
const EASE = 0.3;

const NEUTRAL = { x: 165, y: 100 };

/** Frame whose pupils are closest to the (gx, gy) gaze point. */
function nearestFrame(gx: number, gy: number): number {
  let best = 0;
  let bestD = Infinity;
  for (const [index, x, y] of CAT_GAZE) {
    // Weight y up: its travel is much smaller than x, so it would otherwise be ignored.
    const d = (x - gx) ** 2 + ((y - gy) * 2) ** 2;
    if (d < bestD) {
      bestD = d;
      best = index;
    }
  }
  return best;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Sets the sprite's background position to `frame` via CSS variables (no React re-render). */
function showFrame(el: HTMLElement, frame: number) {
  const col = frame % COLS;
  const row = Math.floor(frame / COLS);
  el.style.setProperty('--cat-x', `${(col / (COLS - 1)) * 100}%`);
  el.style.setProperty('--cat-y', `${(row / (ROWS - 1)) * 100}%`);
}

/** The hero cat: a sprite that follows the cursor with its eyes and head. */
const CatHero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    showFrame(el, 0);
    if (reduceMotion) return;

    // No hover (touch): play the clip as authored.
    if (!window.matchMedia('(hover: hover)').matches) {
      let i = 0;
      const id = setInterval(() => {
        i = (i + 1) % FRAME_COUNT;
        showFrame(el, i);
      }, 1000 / FPS);
      return () => clearInterval(id);
    }

    // Pointer: ease a normalised look vector toward the cursor, render the nearest frame.
    const target = { x: 0, y: 0 };
    const look = { x: 0, y: 0 };
    let raf = 0;
    let shown = -1;

    const tick = () => {
      look.x += (target.x - look.x) * EASE;
      look.y += (target.y - look.y) * EASE;
      const gx = NEUTRAL.x + look.x * (look.x < 0 ? REACH_X[0] : REACH_X[1]);
      const gy = NEUTRAL.y + look.y * (look.y < 0 ? REACH_Y[0] : REACH_Y[1]);
      const frame = nearestFrame(gx, gy);
      if (frame !== shown) {
        shown = frame;
        showFrame(el, frame);
      }
      const settled =
        Math.abs(target.x - look.x) < 0.002 && Math.abs(target.y - look.y) < 0.002;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = clamp((e.clientX - (r.left + r.width * HEAD.x)) / (window.innerWidth * RANGE), -1, 1);
      target.y = clamp((e.clientY - (r.top + r.height * HEAD.y)) / (window.innerHeight * RANGE), -1, 1);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className="scrap-cat"
      role="img"
      aria-label="A round grey cat with big yellow eyes, watching the cursor."
      style={{ ['--cat-sheet' as string]: `url("${sheet}")`, aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
    />
  );
};

export default CatHero;
