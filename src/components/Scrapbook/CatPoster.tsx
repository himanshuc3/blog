import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';
import './poster.scss';
import { motion, useReducedMotion } from 'motion/react';

import poster from '../../images/poster.webp';
import usePostsData from '../../hooks/usePostsData';
import { IPost } from '../../utils/types';

// Gaze origin (between the eyes) and eye sockets, as fractions of the poster's width/height.
const HEAD = { x: 0.485, y: 0.335 };
const EYES = [
  { x: 0.364, y: 0.342 },
  { x: 0.607, y: 0.329 },
];
// Poster aspect (h / w). Chips are placed in poster-width units, so y is scaled by this.
const ASPECT = 1308 / 736;

type Mode = 'pointer' | 'auto' | 'static';

interface ChipDef {
  id: string;
  /** Screen-space angle from the head, degrees (0 = right, 90 = down). */
  angle: number;
  /** Distance from the head in poster widths. Chips sit on the ray the cat is looking along. */
  radius: number;
  tilt: number;
}

const CHIPS: ChipDef[] = [
  { id: 'post', angle: -150, radius: 0.98, tilt: -3 },
  { id: 'avail', angle: -30, radius: 0.98, tilt: 2.5 },
  { id: 'stack', angle: 180, radius: 1.02, tilt: 1.5 },
  { id: 'place', angle: 0, radius: 1.02, tilt: -2 },
  { id: 'rss', angle: 150, radius: 0.98, tilt: 2 },
  { id: 'hi', angle: 30, radius: 0.98, tilt: -2.5 },
];

const rad = (deg: number) => (deg * Math.PI) / 180;
const angleDiff = (a: number, b: number) => Math.abs(((a - b + 540) % 360) - 180);

/** Nearest chip to `angle`, sticking with `current` while the cursor stays near its ray. */
function pickChip(angle: number, current: number): number {
  if (current >= 0 && angleDiff(angle, CHIPS[current].angle) < 42) return current;
  let best = 0;
  CHIPS.forEach((c, i) => {
    if (angleDiff(angle, c.angle) < angleDiff(angle, CHIPS[best].angle)) best = i;
  });
  return best;
}

interface Props {
  variant?: 'arch' | 'polaroid';
}

const CatPoster: React.FC<Props> = ({ variant = 'arch' }) => {
  const reduceMotion = useReducedMotion();
  const posts: IPost[] = usePostsData();
  const latest = posts[0];

  const frameRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef(false);
  const activeRef = useRef(-1);
  const [active, setActive] = useState(-1);
  const [mode, setMode] = useState<Mode>('static');
  const [clock, setClock] = useState('');

  const activate = useCallback((i: number) => {
    if (activeRef.current === i) return;
    activeRef.current = i;
    setActive(i);
  }, []);

  const setGaze = useCallback((gx: number, gy: number) => {
    const el = frameRef.current;
    if (!el) return;
    el.style.setProperty('--gx', gx.toFixed(3));
    el.style.setProperty('--gy', gy.toFixed(3));
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setMode('static');
      return;
    }
    setMode(window.matchMedia('(hover: hover)').matches ? 'pointer' : 'auto');
  }, [reduceMotion]);

  // Live New Delhi clock, client-only to avoid a hydration mismatch.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Pointer mode: the cat watches the cursor anywhere on the page.
  useEffect(() => {
    if (mode !== 'pointer') return;
    const el = frameRef.current;
    if (!el) return;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width * HEAD.x);
        const dy = e.clientY - (r.top + r.height * HEAD.y);
        const dist = Math.hypot(dx, dy);
        const mag = Math.min(1, dist / (r.width * 0.9));
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        setGaze(Math.cos(rad(angle)) * mag, Math.sin(rad(angle)) * mag);
        if (holdRef.current) return;
        // Cursor over the cat itself: just watch, don't pop anything.
        if (dist < r.width * 0.32) activate(-1);
        else activate(pickChip(angle, activeRef.current));
      });
    };
    const onLeave = () => {
      if (holdRef.current) return;
      setGaze(0, 0);
      activate(-1);
    };

    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [mode, activate, setGaze]);

  // Touch / no-hover: the cat glances at each chip in turn.
  useEffect(() => {
    if (mode !== 'auto') return;
    let i = 0;
    const look = () => {
      if (holdRef.current) return;
      const c = CHIPS[i % CHIPS.length];
      setGaze(Math.cos(rad(c.angle)) * 0.9, Math.sin(rad(c.angle)) * 0.9);
      activate(i % CHIPS.length);
      i += 1;
    };
    const first = setTimeout(look, 900);
    const id = setInterval(look, 3200);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [mode, activate, setGaze]);

  const isStatic = mode === 'static';

  const content: Record<string, React.ReactNode> = {
    post: latest ? (
      <Link to={`/blog/${latest.slug}`} className="chip__link">
        <span className="chip__label">Latest post</span>
        <span className="chip__value">{latest.title}</span>
      </Link>
    ) : (
      <span className="chip__label">Fresh posts soon</span>
    ),
    avail: (
      <span className="chip__row">
        <span className="chip__dot" aria-hidden="true" />
        <span className="chip__value">Available for work</span>
      </span>
    ),
    stack: (
      <>
        <span className="chip__label">Daily drivers</span>
        <span className="chip__value">TypeScript · React · Go</span>
      </>
    ),
    place: (
      <>
        <span className="chip__label">New Delhi, IN</span>
        <span className="chip__value">{clock ? `${clock} IST` : 'IST'}</span>
      </>
    ),
    rss: (
      <a href="/rss.xml" target="_blank" rel="noreferrer" className="chip__link">
        <span className="chip__label">Subscribe</span>
        <span className="chip__value">the RSS digest →</span>
      </a>
    ),
    hi: (
      <a href="mailto:himichhabra14@gmail.com" className="chip__link">
        <span className="chip__label">Say hi</span>
        <span className="chip__value">himichhabra14@gmail.com</span>
      </a>
    ),
  };

  return (
    <div
      className={`poster-stage poster-stage--${variant}${isStatic ? ' is-static' : ''}`}
      style={{ ['--aspect' as string]: ASPECT }}
    >
      <div className="poster-stage__frame" ref={frameRef}>
        <div className="poster-stage__arch" aria-hidden="true" />
        <div className="poster-stage__tilt">
          <img
            className="poster-stage__img"
            src={poster}
            width={736}
            height={1308}
            alt="A ginger kitten in a grey three-piece suit and spotted tie, standing on a cobbled street."
            draggable={false}
            {...{ fetchpriority: 'high' }}
          />
          {EYES.map((eye, i) => (
            <span
              key={i}
              className="poster-stage__eye"
              aria-hidden="true"
              style={{ left: `${eye.x * 100}%`, top: `${eye.y * 100}%` }}
            >
              <span className="poster-stage__pupil" />
            </span>
          ))}
          <span className="poster-stage__glare" aria-hidden="true" />
        </div>
      </div>

      <div className="poster-stage__chips">
        {CHIPS.map((chip, i) => {
          const on = isStatic || active === i;
          const x = HEAD.x + chip.radius * Math.cos(rad(chip.angle));
          const y = HEAD.y * ASPECT + chip.radius * Math.sin(rad(chip.angle));
          return (
            <motion.div
              key={chip.id}
              className={`chip sec-font chip--${chip.id}`}
              style={{
                ['--cx' as string]: x,
                ['--cy' as string]: y,
                pointerEvents: on ? 'auto' : 'none',
              }}
              initial={false}
              animate={
                on
                  ? { opacity: 1, scale: 1, rotate: chip.tilt }
                  : { opacity: 0, scale: 0.55, rotate: chip.tilt * 4 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 420, damping: 22, mass: 0.7 }
              }
              onPointerEnter={() => (holdRef.current = true)}
              onPointerLeave={() => (holdRef.current = false)}
              onFocus={() => {
                holdRef.current = true;
                activate(i);
              }}
              onBlur={() => (holdRef.current = false)}
            >
              {content[chip.id]}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CatPoster;
