import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

import CatStage from './CatStage';
import { useNameIs } from './NameIs';
import { HEADLINE, NAME, TAGLINE } from './data';

const ease = [0.22, 1, 0.36, 1] as const;

const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const { trigger, flash, overlay } = useNameIs();
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section className="scrap-hero" id="top">
      <div className="scrap-hero__copy">
        <motion.div className="scrap-hero__id" {...rise(0.15)}>
          <div className="scrap-hero__who">
            <span
              className={`scrap-hero__name script-font${flash ? ' is-flash' : ''}`}
              onPointerEnter={() => trigger('name', true)}
              onPointerLeave={() => trigger('name', false)}
            >
              {NAME}
            </span>
          </div>
          <p className="scrap-hero__tagline grotesk-font">
            {TAGLINE.map((line, l) => (
              <span key={l}>
                {line.map((s, i) =>
                  s.em ? <strong key={i}>{s.text}</strong> : <React.Fragment key={i}>{s.text}</React.Fragment>,
                )}
              </span>
            ))}
          </p>
        </motion.div>
        <motion.h1 className="scrap-hero__headline grotesk-font" {...rise(0.3)}>
          {HEADLINE}
        </motion.h1>
      </div>

      {/* No entrance fade: the cat is the LCP element, and a fade held it at opacity 0 until hydration. */}
      <div className="scrap-hero__cat">
        <CatStage />
      </div>
      {overlay}
    </section>
  );
};

export default Hero;
