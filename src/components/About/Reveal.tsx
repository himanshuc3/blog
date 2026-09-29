import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Fades + lifts its children in the first time they scroll into view. */
const Reveal: React.FC<Props> = ({ children, className, delay = 0 }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
