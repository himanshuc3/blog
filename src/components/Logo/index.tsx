import React from 'react';
import { Link } from 'gatsby';
import { motion, useReducedMotion } from 'motion/react';
import './styles.scss';

/**
 * Minimal "h" glyph drawn in two strokes, with an accent dot that drops in like a period
 * and hops when the logo is hovered. Wordmark sits beside it.
 */
export default function Logo() {
  const reduceMotion = useReducedMotion();
  const draw = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 0.55, delay, ease: 'easeOut' as const },
        };

  return (
    <Link to="/" className="brand" aria-label="Himanshu, home">
      <motion.svg
        className="brand__mark"
        viewBox="0 0 28 28"
        width="28"
        height="28"
        fill="none"
        whileHover="hop"
      >
        <motion.path className="brand__stroke" d="M6 4v20" {...draw(0)} />
        <motion.path className="brand__stroke" d="M6 15c0-3.2 2.4-5 5-5s5 1.8 5 5v9" {...draw(0.25)} />
        <motion.circle
          className="brand__dot"
          cx="23"
          cy="22.5"
          r="2.2"
          initial={reduceMotion ? false : { cy: -4, opacity: 0 }}
          animate={{ cy: 22.5, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 11, delay: 0.7 }}
          variants={{ hop: { cy: [22.5, 17, 22.5], transition: { duration: 0.5 } } }}
        />
      </motion.svg>
      <span className="brand__word">himanshu</span>
    </Link>
  );
}
