import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

import CatPoster from './CatPoster';
import Sticker from './Sticker';
import { HEADLINE, HERO_BG, HERO_STICKERS, NAME, TITLE } from './data';

const ease = [0.22, 1, 0.36, 1] as const;

const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section className="scrap-hero" id="top" ref={ref}>
      <div
        className="scrap-hero__landscape"
        aria-hidden="true"
        style={{ ['--hero-img' as string]: `url("${HERO_BG}")` }}
      />
      <div className="scrap-grain" aria-hidden="true" />

      <div className="scrap-hero__copy">
        <motion.div className="scrap-hero__id" {...rise(0.15)}>
          <span className="scrap-hero__name script-font">{NAME}</span>
          <span className="scrap-tag grotesk-font">{TITLE}</span>
        </motion.div>
        <motion.h1 className="scrap-hero__headline grotesk-font" {...rise(0.3)}>
          {HEADLINE}
        </motion.h1>
      </div>

      <div className="scrap-hero__stage">
        <div className="scrap-hero__stickers">
          {HERO_STICKERS.map((s, i) => (
            <Sticker key={s.id} def={s} index={i} />
          ))}
          <motion.aside
            className="scrap-widget grotesk-font"
            aria-label="Terminal widget"
            initial={reduceMotion ? false : { opacity: 0, x: 40, rotate: 8 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 150, damping: 16, delay: 0.9 }}
            drag
            dragMomentum={false}
          >
            <span className="scrap-widget__app">Terminal</span>
            <span className="scrap-widget__title">git commit</span>
            <span className="scrap-widget__sub">-m “it works on my machine”</span>
            <span className="scrap-widget__bar" aria-hidden="true">
              <i />
            </span>
          </motion.aside>
        </div>
        <motion.div
          className="scrap-hero__photo"
          initial={reduceMotion ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
        >
          <CatPoster variant="polaroid" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
