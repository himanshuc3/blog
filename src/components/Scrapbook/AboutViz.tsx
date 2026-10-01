import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  SiApachekafka,
  SiExpress,
  SiGatsby,
  SiGo,
  SiNetlify,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRust,
  SiSass,
  SiSolana,
  SiSvelte,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';

import earpodsImg from '../../images/cutouts/earpods.webp';
import monsterImg from '../../images/cutouts/monster.webp';
import mouseImg from '../../images/cutouts/mouse.webp';
import ttImg from '../../images/cutouts/tt.webp';
import chessImg from '../../images/cutouts/chess.webp';
import japaneseImg from '../../images/cutouts/japanese.webp';
import valorantImg from '../../images/cutouts/valorant.webp';
import { PROFILE, Scene, WORK_HISTORY } from './data';

/** Illustrations that sit beside the About description. `scene` picks which one shows. */

// ---- stack (the default) ---------------------------------------------------------------------

const STACK_TILES = [
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { name: 'React', Icon: SiReact, color: '#00a8cc' },
  { name: 'Golang', Icon: SiGo, color: '#00add8' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5fa04e' },
  { name: 'Svelte', Icon: SiSvelte, color: '#ff3e00' },
  { name: 'Gatsby', Icon: SiGatsby, color: '#8a4fbf' },
  { name: 'Sass', Icon: SiSass, color: '#cc6699' },
  { name: 'Netlify', Icon: SiNetlify, color: '#00a99d' },
  { name: 'Express', Icon: SiExpress, color: '#444444' },
  { name: 'Vue.js', Icon: SiVuedotjs, color: '#42b883' },
  { name: 'Redis', Icon: SiRedis, color: '#dc382d' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
  { name: 'Kafka', Icon: SiApachekafka, color: '#231f20' },
  { name: 'Rust', Icon: SiRust, color: '#b7410e' },
  { name: 'Solana', Icon: SiSolana, color: '#9945ff' },
];

// Rotations are fixed so server and client render the same thing.
const TILT = [-5, 4, -3, 6, 3, -6, 5, -4, 3, -5, 6, -3, 4, -6];

const Stack: React.FC = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // The pill being handled sits above the rest; otherwise it can slide under a later sibling.
  const [top, setTop] = useState(-1);
  return (
    <div className="viz-stack" ref={boardRef}>
      {STACK_TILES.map(({ name, Icon, color }, i) => (
        <div key={name} className="viz-stack__cell">
          <motion.div
            className="viz-stack__tile"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.7, rotate: TILT[i] - 20 }}
            animate={{ opacity: 1, scale: 1, rotate: TILT[i] }}
            transition={{ delay: i * 0.045, type: 'spring', stiffness: 380, damping: 24 }}
            drag
            dragConstraints={boardRef}
            dragElastic={0}
            dragMomentum={false}
            style={{ zIndex: top === i ? 10 : 1 }}
            onPointerDown={() => setTop(i)}
            whileHover={{ scale: 1.06 }}
            whileDrag={{ scale: 1.12 }}
          >
            <Icon color={color} aria-hidden="true" />
            <span>{name}</span>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

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

// ---- shared: a loose collage of cut-outs, slightly overlapping, no card ---------------------------

/**
 * `left`, `top` and `w` are percentages of a 516×480 stage; height follows the (trimmed) image.
 * The stage keeps that ratio at any width, so the overlaps hold on small screens too.
 */
type Photo = { alt: string; src: string; left: number; top: number; w: number; rotate: number; z?: number };

const Photos: React.FC<{ photos: Photo[] }> = ({ photos }) => (
  <div className="viz-photos">
    {photos.map(({ alt, src, left, top, w, rotate, z = 1 }, i) => (
      <motion.img
        key={alt}
        className="viz-photos__img"
        src={src}
        alt={alt}
        draggable={false}
        style={{ left: `${left}%`, top: `${top}%`, width: `${w}%`, zIndex: z }}
        initial={{ opacity: 0, y: 30, rotate: rotate - 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, rotate, scale: 1 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 220, damping: 20 }}
        whileHover={{ scale: 1.06, zIndex: 5 }}
      />
    ))}
  </div>
);

// ---- chess ---------------------------------------------------------------------------------------

const CHESS_PHOTOS: Photo[] = [
  { alt: 'japanese hiragana characters', src: japaneseImg, left: 26, top: 2, w: 48, rotate: 3, z: 2 },
  { alt: 'a black chess king', src: chessImg, left: 2, top: 12, w: 30, rotate: -6 },
  { alt: 'valorant', src: valorantImg, left: 58, top: 31, w: 38, rotate: 7 },
];

const Chess: React.FC = () => <Photos photos={CHESS_PHOTOS} />;

// ---- live without: the daily addictions --------------------------------------------------------

const LIVE_PHOTOS: Photo[] = [
  { alt: 'earphones', src: earpodsImg, left: 24, top: 0, w: 46, rotate: -5, z: 2 },
  { alt: 'tt', src: ttImg, left: 0, top: 50, w: 46, rotate: -8 },
  { alt: 'monster can', src: monsterImg, left: 40, top: 38, w: 28, rotate: 4, z: 3 },
  { alt: 'mouse', src: mouseImg, left: 50, top: 70, w: 46, rotate: 6 },
];

const LiveWithout: React.FC = () => <Photos photos={LIVE_PHOTOS} />;

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
  livewithout: 'daily addictions',
  place: 'home base',
  geometry: 'computational geometry',
};

const SCENES: Record<Scene, React.FC> = {
  stack: Stack,
  perf: Perf,
  a11y: A11y,
  chess: Chess,
  livewithout: LiveWithout,
  place: Place,
  geometry: Geometry,
};

const AboutViz: React.FC<{ scene: Scene }> = ({ scene }) => {
  const reduceMotion = useReducedMotion();
  const Body = SCENES[scene];
  return (
    <div
      className={`scrap-viz grotesk-font${
        scene === 'stack' ? ' scrap-viz--board' : scene === 'chess' || scene === 'livewithout' ? ' scrap-viz--bare' : ''
      }`}
      aria-live="polite"
    >
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
      {scene !== 'stack' && scene !== 'chess' && scene !== 'livewithout' && <p className="scrap-viz__cap script-font">{CAPTIONS[scene]}</p>}
    </div>
  );
};

export default AboutViz;
