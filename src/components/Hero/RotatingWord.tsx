import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface Props {
  words: string[];
  interval?: number;
}

/** Cycles through `words` with a soft vertical blur-swap. Static when reduced motion is on. */
const RotatingWord: React.FC<Props> = ({ words, interval = 2600 }) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduceMotion, words.length, interval]);

  return (
    <span className="hero__rotator" aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          className="hero__rotator-word"
          initial={{ y: '60%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-60%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingWord;
