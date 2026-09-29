import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

type Token = { t: 'kw' | 'key' | 'str' | 'punct' | 'com'; v: string };

// Each line is a list of tokens so the card can be restyled per theme purely in CSS.
const LINES: Token[][] = [
  [{ t: 'com', v: '// who.ts' }],
  [
    { t: 'kw', v: 'const ' },
    { t: 'key', v: 'engineer ' },
    { t: 'punct', v: '= {' },
  ],
  [
    { t: 'key', v: '  role' },
    { t: 'punct', v: ': ' },
    { t: 'str', v: "'Senior Frontend Engineer'" },
    { t: 'punct', v: ',' },
  ],
  [
    { t: 'key', v: '  company' },
    { t: 'punct', v: ': ' },
    { t: 'str', v: "'QuillBot'" },
    { t: 'punct', v: ',' },
  ],
  [
    { t: 'key', v: '  stack' },
    { t: 'punct', v: ': [' },
    { t: 'str', v: "'TypeScript'" },
    { t: 'punct', v: ', ' },
    { t: 'str', v: "'React'" },
    { t: 'punct', v: ', ' },
    { t: 'str', v: "'Go'" },
    { t: 'punct', v: '],' },
  ],
  [
    { t: 'key', v: '  cares' },
    { t: 'punct', v: ': [' },
    { t: 'str', v: "'perf'" },
    { t: 'punct', v: ', ' },
    { t: 'str', v: "'a11y'" },
    { t: 'punct', v: ', ' },
    { t: 'str', v: "'craft'" },
    { t: 'punct', v: '],' },
  ],
  [
    { t: 'key', v: '  base' },
    { t: 'punct', v: ': ' },
    { t: 'str', v: "'New Delhi, IN'" },
    { t: 'punct', v: ',' },
  ],
  [{ t: 'punct', v: '} ' }, { t: 'kw', v: 'as const' }, { t: 'punct', v: ';' }],
];

const MAX_TILT = 5; // degrees

/** Decorative "poster" card: lines type in one by one and the card leans toward the cursor. */
const CodeCard: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0); // -0.5..0.5 across the card
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, (v) => v * MAX_TILT * 2), { stiffness: 120, damping: 14 });
  const rotateX = useSpring(useTransform(py, (v) => v * -MAX_TILT * 2), { stiffness: 120, damping: 14 });

  const onMove = (e: React.PointerEvent) => {
    if (reduceMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      className="hero__card-wrap"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden="true"
    >
      <motion.div
        ref={ref}
        className="hero__card"
        style={{ rotateX, rotateY }}
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="hero__card-bar">
          <i /> <i /> <i />
          <span>who.ts</span>
        </div>
        <pre className="hero__card-code">
          {LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.09, duration: 0.35 }}
            >
              {line.map((tok, j) => (
                <span key={j} className={`tok-${tok.t}`}>
                  {tok.v}
                </span>
              ))}
            </motion.div>
          ))}
          <span className="hero__caret" />
        </pre>
      </motion.div>
    </motion.div>
  );
};

export default CodeCard;
