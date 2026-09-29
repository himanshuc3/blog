import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

import Placeholder from './Placeholder';
import type { StickerDef } from './data';

/** A draggable cut-out. Position is relative to the sticker row's centre (see `--u` in styles). */
const Sticker: React.FC<{ def: StickerDef; index: number }> = ({ def, index }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="sticker"
      style={{
        ['--x' as string]: def.x,
        ['--y' as string]: def.y,
        ['--w' as string]: def.w,
        ['--h' as string]: def.h,
        zIndex: def.z ?? 1,
      }}
      initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: def.rotate - 14, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, rotate: def.rotate, scale: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.5 + index * 0.1 }}
      drag
      dragMomentum={false}
      whileHover={{ scale: 1.05, rotate: def.rotate + 3 }}
      whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
    >
      <Placeholder label={def.label} src={def.src} shape={def.shape} />
    </motion.div>
  );
};

export default Sticker;
