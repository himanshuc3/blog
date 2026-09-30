import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

import CatHero from './CatHero';
import { HEADLINE, NAME, TITLE } from './data';

const ease = [0.22, 1, 0.36, 1] as const;

const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section className="scrap-hero" id="top">
      <div className="scrap-hero__copy">
        <motion.div className="scrap-hero__id" {...rise(0.15)}>
          <span className="scrap-hero__name script-font">{NAME}</span>
          <span className="scrap-tag grotesk-font">{TITLE}</span>
        </motion.div>
        <motion.h1 className="scrap-hero__headline grotesk-font" {...rise(0.3)}>
          {HEADLINE}
        </motion.h1>
      </div>

      <motion.div className="scrap-hero__cat" {...rise(0.45)}>
        <CatHero />
      </motion.div>
    </section>
  );
};

export default Hero;
