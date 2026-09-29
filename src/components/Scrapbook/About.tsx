import React from 'react';
import { motion } from 'motion/react';

import { ABOUT } from './data';

const About: React.FC<{ hero?: boolean }> = ({ hero = false }) => {
  const Title = hero ? motion.h1 : motion.h2;
  return (
    <section className={`scrap-about grid-paper${hero ? ' scrap-about--hero' : ''}`} id="about">
      <Title
        className="scrap-about__title grotesk-font"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {ABOUT.heading.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </Title>
      <motion.div
        className="scrap-about__body grotesk-font crop-marks"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        {ABOUT.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="script-font scrap-about__sign">{ABOUT.signoff}</p>
      </motion.div>
    </section>
  );
};

export default About;
