import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SiGatsby, SiGo, SiNetlify, SiNodedotjs, SiReact, SiSass, SiSvelte, SiTypescript } from 'react-icons/si';

import { PROFILE, Scene, WORK_HISTORY } from './data';

/** Illustrations that sit beside the About description. `scene` picks which one shows. */

// ---- stack (the default) ---------------------------------------------------------------------

const STACK_TILES = [
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { name: 'React', Icon: SiReact, color: '#00a8cc' },
  { name: 'Go', Icon: SiGo, color: '#00add8' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5fa04e' },
  { name: 'Svelte', Icon: SiSvelte, color: '#ff3e00' },
  { name: 'Gatsby', Icon: SiGatsby, color: '#8a4fbf' },
  { name: 'Sass', Icon: SiSass, color: '#cc6699' },
  { name: 'Netlify', Icon: SiNetlify, color: '#00a99d' },
];

const Stack: React.FC = () => (
  <div className="viz-stack">
    {STACK_TILES.map(({ name, Icon, color }, i) => (
      <motion.div
        key={name}
        className="viz-stack__tile"
        initial={{ opacity: 0, y: 14, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: i * 0.045, type: 'spring', stiffness: 380, damping: 24 }}
      >
        <Icon color={color} aria-hidden="true" />
        <span>{name}</span>
      </motion.div>
    ))}
  </div>
);

// ---- rendering performance: one frame's budget -----------------------------------------------

const FRAME = [
  { name: 'script', ms: 4.2 },
  { name: 'style', ms: 1.6 },
  { name: 'layout', ms: 2.8 },
  { name: 'paint', ms: 2.4 },
  { name: 'composite', ms: 1.2 },
  { name: 'headroom', ms: 4.5, idle: true },
];

const Perf: React.FC = () => (
  <div className="viz-perf">
    <p className="viz-perf__big grotesk-font">
      16.7<small>ms</small>
    </p>
    <p className="viz-perf__sub">the budget for one frame at 60fps</p>
    <div className="viz-perf__bar" aria-hidden="true">
      {FRAME.map((f, i) => (
        <motion.span
          key={f.name}
          className={f.idle ? 'is-idle' : undefined}
          style={{ flexGrow: f.ms }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.1 + i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
    <ul className="viz-perf__legend">
      {FRAME.map((f) => (
        <li key={f.name} className={f.idle ? 'is-idle' : undefined}>
          <i /> {f.name} <b>{f.ms}ms</b>
        </li>
      ))}
    </ul>
  </div>
);

// ---- accessibility: keyboard focus + a real contrast ratio -----------------------------------

const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const A11y: React.FC = () => {
  const ratio = contrast('#151515', '#f5c518');
  return (
    <div className="viz-a11y">
      <div className="viz-a11y__row">
        <span className="viz-a11y__key">Tab</span>
        <span aria-hidden="true">→</span>
        <motion.span
          className="viz-a11y__btn"
          initial={{ boxShadow: '0 0 0 0 var(--ink)' }}
          animate={{ boxShadow: '0 0 0 3px var(--surface, #fff), 0 0 0 5px var(--ink)' }}
          transition={{ delay: 0.35, duration: 0.25 }}
        >
          Continue
        </motion.span>
      </div>
      <div className="viz-a11y__swatch">
        <span className="viz-a11y__aa">Aa</span>
        <div>
          <b>{ratio.toFixed(1)}:1</b>
          <span>contrast, dark ink on yellow</span>
        </div>
        <span className="viz-a11y__badges">
          <em>AA</em>
          {ratio >= 7 && <em>AAA</em>}
        </span>
      </div>
      <p className="viz-a11y__note">focus you can see, colours you can read, motion you can turn off</p>
    </div>
  );
};

// ---- chess: a knight, some hiragana, and a spray pattern ----------------------------------------

const CHESS_TILES = [
  { label: 'chess', node: <span className="viz-chess__glyph">♞</span> },
  { label: 'japanese', node: <span className="viz-chess__glyph viz-chess__glyph--jp">あ</span> },
  {
    label: 'valorant',
    // Placeholder spray pattern until a custom image is dropped in.
    node: (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {[
          [20, 20], [21, 15], [19, 10], [23, 7], [17, 5],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.8" fill="currentColor" />
        ))}
      </svg>
    ),
  },
];

const Chess: React.FC = () => (
  <div className="viz-chess">
    {CHESS_TILES.map(({ label, node }, i) => (
      <motion.div
        key={label}
        className="viz-chess__tile"
        initial={{ opacity: 0, y: 14, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: i * 0.09, type: 'spring', stiffness: 380, damping: 24 }}
      >
        {node}
        <span>{label}</span>
      </motion.div>
    ))}
  </div>
);

// ---- place: New Delhi, live, and where I work ------------------------------------------------

const Place: React.FC = () => {
  const [now, setNow] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const current = WORK_HISTORY[0];
  return (
    <div className="viz-place">
      <p className="viz-place__city script-font">{PROFILE.city.toLowerCase()}</p>
      <p className="viz-place__time grotesk-font">{now || '--:--:--'}</p>
      <p className="viz-place__meta">IST · 28.61° N, 77.21° E</p>
      <div className="viz-place__work">
        {current.logo && <img src={current.logo} alt="" />}
        <span>
          currently at <b>{current.org}</b> · {current.role}
        </span>
      </div>
    </div>
  );
};

// ---- computational geometry: a convex hull ---------------------------------------------------

type Pt = { x: number; y: number };

function hullOf(pts: Pt[]): Pt[] {
  const s = [...pts].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o: Pt, a: Pt, b: Pt) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const build = (list: Pt[]) => {
    const out: Pt[] = [];
    for (const p of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop();
      out.push(p);
    }
    out.pop();
    return out;
  };
  return [...build(s), ...build([...s].reverse())];
}

const Geometry: React.FC = () => {
  const { pts, hull } = useMemo(() => {
    let seed = 11;
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
    const list = Array.from({ length: 22 }, () => ({ x: 20 + rnd() * 260, y: 16 + rnd() * 168 }));
    return { pts: list, hull: hullOf(list) };
  }, []);
  const path = hull.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';
  return (
    <div className="viz-geo">
      <svg viewBox="0 0 300 200" role="img" aria-label="Scattered points wrapped by their convex hull">
        <motion.path
          d={path}
          className="viz-geo__hull"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{ pathLength: { duration: 1.1, ease: 'easeInOut' }, fillOpacity: { delay: 1, duration: 0.4 } }}
        />
        {pts.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hull.includes(p) ? 4.2 : 3}
            className={hull.includes(p) ? 'viz-geo__pt is-hull' : 'viz-geo__pt'}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ))}
      </svg>
      <p className="viz-geo__cap">a convex hull: the smallest rubber band around every point</p>
    </div>
  );
};

// ---- the frame ---------------------------------------------------------------------------------

const CAPTIONS: Record<Scene, string> = {
  stack: 'what I reach for',
  perf: 'rendering performance',
  a11y: 'accessibility',
  chess: 'off the clock',
  place: 'home base',
  geometry: 'computational geometry',
};

const SCENES: Record<Scene, React.FC> = {
  stack: Stack,
  perf: Perf,
  a11y: A11y,
  chess: Chess,
  place: Place,
  geometry: Geometry,
};

const AboutViz: React.FC<{ scene: Scene }> = ({ scene }) => {
  const reduceMotion = useReducedMotion();
  const Body = SCENES[scene];
  return (
    <div className="scrap-viz grotesk-font" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={scene}
          className="scrap-viz__scene"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, transition: { duration: 0.12 } }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Body />
        </motion.div>
      </AnimatePresence>
      <p className="scrap-viz__cap script-font">{CAPTIONS[scene]}</p>
    </div>
  );
};

export default AboutViz;
