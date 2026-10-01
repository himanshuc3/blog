import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

import sheet from '../../images/cat-spritesheet.webp';
import poster from '../../images/cat-frame-0.webp';
import { saveDataOn, whenPageIdle } from '../../utils/idle';
import { CAT_GAZE } from './catGaze';

// Sheet layout, from cat-spritesheet.json.
const COLS = 14;
const ROWS = 3;
const FRAME_COUNT = 39;
const FPS = 10;
const FRAME_W = 320;
const FRAME_H = 480;

// Where the eyes sit in a frame (the neutral frame's gaze), as fractions of its size.
const HEAD = { x: 164 / FRAME_W, y: 98 / FRAME_H };
// How far the pupils travel in the sheet, in frame px: [left, right] and [up, down].
const REACH_X = [64, 54] as const;
// Up travel is constant. Down is short straight below (the sheet's only straight-down frames barely
// move) and grows to `REACH_DOWN_TURNED` as the look turns sideways, where the head-turned frames sit.
const REACH_UP = 20;
const REACH_DOWN = 8;
const REACH_DOWN_TURNED = 31;
// Cursor distance (as a fraction of the viewport) at which the cat is looking at its limit.
const RANGE = 0.35;
// Per-frame easing toward the cursor. Higher is snappier.
const EASE = 0.3;

const NEUTRAL = { x: 164, y: 98 };

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

/** Paints `frame` of the spritesheet onto the canvas (no React re-render, no style recalculation). */
function drawFrame(canvas: HTMLCanvasElement | null, img: ImageBitmap | null, frame: number) {
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx || !img) return;
  const col = frame % COLS;
  const row = Math.floor(frame / COLS);
  ctx.clearRect(0, 0, FRAME_W, FRAME_H);
  ctx.drawImage(img, col * FRAME_W, row * FRAME_H, FRAME_W, FRAME_H, 0, 0, FRAME_W, FRAME_H);
}

/**
 * Fetches the full spritesheet (~1.8 MB) once the page has loaded, painted its content and the
 * browser is idle, then hands the decoded bitmap to `onLoad`. Until then the cat shows `poster`,
 * the same frame the sprite starts on. Skipped when it wouldn't be used (reduced motion), the
 * visitor asked to save data, or the browser can't decode off the main thread.
 *
 * The sheet is a 4480 x 1440 image. Decoding it from an <img> (which drawing one onto a canvas does)
 * happens on the main thread and blocks input for hundreds of milliseconds on a slow phone;
 * `createImageBitmap` on a Blob decodes it off-thread, and the canvas then draws from the bitmap.
 */
function useSpriteSheet(enabled: boolean, onLoad: (sheet: ImageBitmap) => void) {
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;

  useEffect(() => {
    if (!enabled || saveDataOn() || typeof createImageBitmap !== 'function') return;

    let cancelled = false;
    const load = () => {
      // Low priority: a background download. On failure the cat just stays on the poster.
      fetch(sheet, { priority: 'low' } as RequestInit)
        .then((res) => res.blob())
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => (cancelled ? bitmap.close() : onLoadRef.current(bitmap)))
        .catch(() => {});
    };
    const cancelWait = whenPageIdle(load);

    return () => {
      cancelled = true;
      cancelWait();
    };
  }, [enabled]);
}

/** The hero cat: a sprite that follows the cursor with its eyes and head. */
export type Zone = 'left' | 'right' | 'below';

// Where the cat looks when a label is hovered instead of the cursor (normalised look vector).
const FOCUS_LOOK: Record<Zone, { x: number; y: number }> = {
  left: { x: -1, y: 0.15 },
  right: { x: 1, y: 0.15 },
  below: { x: 0, y: 1 },
};
// Look magnitude past which the cat counts as looking at a zone, and where it lets go again.
const ZONE_ON = 0.55;
const ZONE_OFF = 0.35;

function zoneOf(x: number, y: number, current: Zone | null): Zone | null {
  if (current) {
    const m = current === 'below' ? y : current === 'left' ? -x : x;
    if (m > ZONE_OFF) return current;
  }
  if (y > ZONE_ON && y >= Math.abs(x)) return 'below';
  if (x < -ZONE_ON) return 'left';
  if (x > ZONE_ON) return 'right';
  return null;
}

interface Props {
  /** Reports which side the cat is looking at (null while it looks elsewhere). */
  onZone?: (zone: Zone | null) => void;
  /** Makes the cat look at this side regardless of the cursor (used while a label is hovered). */
  focus?: Zone | null;
}

const CatHero: React.FC<Props> = ({ onZone, focus = null }) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sheetRef = useRef<ImageBitmap | null>(null);
  const [sheetReady, setSheetReady] = useState(false);
  // The sprite is drawn on a canvas, never as a CSS background: Chrome counts a background image as
  // a new largest-contentful-paint candidate when it first paints, which would make the 1.8 MB
  // sheet the page's LCP again. Frame 0 is drawn before the poster is hidden so nothing flashes.
  useSpriteSheet(!reduceMotion, (bitmap) => {
    sheetRef.current = bitmap;
    drawFrame(canvasRef.current, bitmap, 0);
    setSheetReady(true);
  });
  useEffect(() => () => sheetRef.current?.close(), []); // frees the decoded sheet (~25 MB)
  const onZoneRef = useRef(onZone);
  onZoneRef.current = onZone;
  const focusRef = useRef(focus);
  focusRef.current = focus;
  const kickRef = useRef<() => void>();

  // A label hover starts (or ends) a look immediately.
  useEffect(() => {
    kickRef.current?.();
  }, [focus]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Nothing to animate until the spritesheet has arrived (and never with reduced motion).
    if (reduceMotion || !sheetReady) return;
    const showFrame = (frame: number) => drawFrame(canvasRef.current, sheetRef.current, frame);

    // No hover (touch): play the clip as authored.
    if (!window.matchMedia('(hover: hover)').matches) {
      let i = 0;
      const id = setInterval(() => {
        i = (i + 1) % FRAME_COUNT;
        showFrame(i);
      }, 1000 / FPS);
      return () => clearInterval(id);
    }

    // Pointer: ease a normalised look vector toward the cursor, render the nearest frame.
    const target = { x: 0, y: 0 };
    const look = { x: 0, y: 0 };
    let raf = 0;
    let shown = -1;
    let zone: Zone | null = null;

    const tick = () => {
      const f = focusRef.current;
      const goal = f ? FOCUS_LOOK[f] : target;
      look.x += (goal.x - look.x) * EASE;
      look.y += (goal.y - look.y) * EASE;
      const z = zoneOf(look.x, look.y, zone);
      if (z !== zone) {
        zone = z;
        onZoneRef.current?.(z);
      }
      const gx = NEUTRAL.x + look.x * (look.x < 0 ? REACH_X[0] : REACH_X[1]);
      const reachDown = REACH_DOWN + (REACH_DOWN_TURNED - REACH_DOWN) * Math.abs(look.x);
      const gy = NEUTRAL.y + look.y * (look.y < 0 ? REACH_UP : reachDown);
      const frame = nearestFrame(gx, gy);
      if (frame !== shown) {
        shown = frame;
        showFrame(frame);
      }
      const settled = Math.abs(goal.x - look.x) < 0.002 && Math.abs(goal.y - look.y) < 0.002;
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

    kickRef.current = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      kickRef.current = undefined;
      if (zone) onZoneRef.current?.(null);
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [reduceMotion, sheetReady]);

  return (
    <div
      ref={ref}
      className={`scrap-cat${sheetReady ? ' is-ready' : ''}`}
      role="img"
      aria-label="A round grey cat with big yellow eyes, watching the cursor."
      style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
    >
      {/* First paint: one small frame in the server HTML. The canvas takes over once the sheet has loaded. */}
      <img
        className="scrap-cat__poster"
        src={poster}
        width={FRAME_W}
        height={FRAME_H}
        alt=""
        decoding="async"
        {...{ fetchpriority: 'high' }} // React 18.2 doesn't know `fetchPriority`
      />
      <canvas
        ref={canvasRef}
        className="scrap-cat__canvas"
        width={FRAME_W}
        height={FRAME_H}
        aria-hidden="true"
      />
    </div>
  );
};

export default CatHero;
