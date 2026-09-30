import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';
import { motion } from 'motion/react';

import AboutViz from './AboutViz';
import { ABOUT, Scene } from './data';

const DEFAULT_SCENE: Scene = 'stack';

const About: React.FC<{ hero?: boolean }> = ({ hero = false }) => {
  const Title = hero ? motion.h1 : motion.h2;
  const [scene, setScene] = useState<Scene>(DEFAULT_SCENE);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>();

  const show = (next: Scene) => {
    clearTimeout(leaveTimer.current);
    setScene(next);
  };
  // A short delay so sliding between two phrases doesn't flash the default in between.
  const release = () => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setScene(DEFAULT_SCENE), 180);
  };
  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  const fade = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-15% 0px' } as const,
  };

  return (
    <section className={`scrap-about grid-paper${hero ? ' scrap-about--hero' : ''}`} id="about">
      <Title
        className="scrap-about__head"
        {...fade}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="scrap-about__title grotesk-font">{ABOUT.title}</span>
        <span className="scrap-about__script script-font">{ABOUT.script}</span>
      </Title>

      <div className="scrap-about__grid">
        <motion.div
          className="scrap-about__body grotesk-font"
          {...fade}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {ABOUT.body.map((para, i) => (
            <p key={i}>
              {para.map((seg, j) =>
                seg.to ? (
                  <Link key={j} to={seg.to} className="scrap-phrase scrap-phrase--link">
                    {seg.text}
                  </Link>
                ) : seg.strike ? (
                  <s key={j}>{seg.text}</s>
                ) : seg.scene ? (
                  <button
                    key={j}
                    type="button"
                    className={`scrap-phrase${scene === seg.scene ? ' is-on' : ''}`}
                    onPointerEnter={() => show(seg.scene as Scene)}
                    onPointerLeave={release}
                    onFocus={() => show(seg.scene as Scene)}
                    onBlur={release}
                    onClick={() => show(seg.scene as Scene)}
                  >
                    {seg.text}
                  </button>
                ) : (
                  <React.Fragment key={j}>{seg.text}</React.Fragment>
                ),
              )}
            </p>
          ))}
          <p className="script-font scrap-about__sign">{ABOUT.signoff}</p>
        </motion.div>

        <motion.div
          {...fade}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AboutViz scene={scene} />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
