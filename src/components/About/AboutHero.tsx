import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

import dp from '../../images/dp.webp';
import AvailableBadge from '../AvailableBadge';
import { useSpotlight } from '../../hooks/useSpotlight';
import LocalTime from './LocalTime';
import { PROFILE } from './data';

// Each line slides up out of its own mask; `px` segments use the pixel (tertiary) font.
type Seg = { text: string; px?: boolean };
const HEADLINE: Seg[][] = [
  [{ text: 'Obsessed with the' }],
  [{ text: 'milliseconds', px: true }],
  [{ text: 'between click & paint.' }],
];

// Draggable stickers pinned around the portrait. Positions are % of the photo frame.
const STICKERS = [
  { label: '♟ chess blunders', style: { top: '8%', left: '-14%' }, rotate: -8 },
  { label: '🎯 valorant', style: { top: '46%', right: '-16%' }, rotate: 6 },
  { label: '📚 tsundoku', style: { bottom: '12%', left: '-10%' }, rotate: -4 },
];

const ease = [0.22, 1, 0.36, 1] as const;

const AboutHero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  useSpotlight(ref);

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section className="about-hero" ref={ref}>
      <div className="about-hero__grid" aria-hidden="true" />
      <div className="about-hero__spotlight" aria-hidden="true" />

      <div className="about-hero__text">
        <motion.p className="about-hero__eyebrow tertiary-font" {...fadeUp(0)}>
          ✦ about me
        </motion.p>

        <h1 className="about-hero__title">
          {HEADLINE.map((line, i) => (
            <span className="about-hero__mask" key={i}>
              <motion.span
                className="about-hero__line"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, delay: 0.1 + i * 0.09, ease }}
              >
                {line.map((seg, j) => (
                  <span key={j} className={seg.px ? 'about-hero__px tertiary-font' : 'about-hero__seg'}>
                    {seg.text}
                  </span>
                ))}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div className="about-hero__bio sec-font" {...fadeUp(0.4)}>
          <p>
            I'm Himanshu, a {PROFILE.role.toLowerCase()} at{' '}
            <strong className="about-hero__company">{PROFILE.company}</strong>. Most days I'm
            trimming bundles, untangling state and arguing that accessibility is a feature, not a
            ticket.
          </p>
          <p>
            I took a detour through computational geometry long enough to publish a paper on convex
            hulls. This blog is where I write things down, usually right after learning them the hard
            way.
          </p>
        </motion.div>

        <motion.ul className="about-hero__chips sec-font" {...fadeUp(0.5)}>
          <li>
            <LocalTime />
          </li>
          <li>📍 {PROFILE.city}, IN</li>
          <li>
            <a href={`mailto:${PROFILE.email}`} className="about-hero__chip-link">
              ✉ say hi
            </a>
          </li>
        </motion.ul>
      </div>

      <motion.div
        className="about-hero__portrait"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ duration: 0.8, delay: 0.25, ease }}
      >
        <div className="about-hero__frame">
          <img src={dp} alt="Himanshu Chhabra" width={320} height={320} />
          {PROFILE.available && (
            <div className="about-hero__badge">
              <AvailableBadge />
            </div>
          )}
        </div>

        {STICKERS.map((s, i) => (
          <motion.span
            key={s.label}
            className="about-hero__sticker sec-font"
            style={{ ...s.style, rotate: s.rotate }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.12, type: 'spring', stiffness: 380, damping: 18 }}
            drag={!reduceMotion}
            dragElastic={0.6}
            dragSnapToOrigin
            whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: 0 }}
            whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
            aria-hidden="true"
          >
            {s.label}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutHero;
