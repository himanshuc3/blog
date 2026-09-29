import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { motion, useReducedMotion } from 'motion/react';

import { useSpotlight } from '../../hooks/useSpotlight';
import RotatingWord from './RotatingWord';
import CodeCard from './CodeCard';
import './styles.scss';

const FOCUS_WORDS = ['fast interfaces', 'design systems', 'developer tooling', 'resilient web apps'];
// Segments flagged `px` are set in the tertiary (pixel) font, mixed into the name.
type Seg = { text: string; px?: boolean };
const NAME: Seg[][] = [
  [{ text: 'Hi', px: true }, { text: 'manshu' }],
  [{ text: 'Chha' }, { text: 'bra', px: true }],
];
const ease = [0.22, 1, 0.36, 1] as const;

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  useSpotlight(ref);

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section className="hero" ref={ref}>
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__spotlight" aria-hidden="true" />

      <div className="hero__text">
        <h1 className="hero__name">
          {NAME.map((word, i) => (
            <span className="hero__mask" key={i} aria-label={word.map((g) => g.text).join('')}>
              <motion.span
                className="hero__word"
                initial={reduceMotion ? false : { y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, delay: 0.1 + i * 0.09, ease }}
              >
                {word.map((g, j) => (
                  <span key={j} className={g.px ? 'hero__px tertiary-font' : undefined} aria-hidden="true">
                    {g.text}
                  </span>
                ))}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="hero__lead sec-font" {...fadeUp(0.35)}>
          Building
          <RotatingWord words={FOCUS_WORDS} />
        </motion.p>

        <motion.p className="hero__bio sec-font" {...fadeUp(0.45)}>
          I care about rendering performance, accessibility and the unglamorous details that make
          a product feel fast. Based in New Delhi. I also write about JavaScript, Go and
          computational geometry.
        </motion.p>

        <motion.div className="hero__cta sec-font" {...fadeUp(0.55)}>
          <Link to="/blog" className="hero__btn hero__btn--primary">
            Read the writing <span aria-hidden="true">→</span>
          </Link>
          <a className="hero__btn" href="mailto:himichhabra14@gmail.com">
            Get in touch
          </a>
        </motion.div>
      </div>

      <CodeCard />
    </section>
  );
};

export default Hero;
