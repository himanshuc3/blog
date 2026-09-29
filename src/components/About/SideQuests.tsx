import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FaGolang } from 'react-icons/fa6';
import { TbBrandValorant } from 'react-icons/tb';
import { PiBooksThin } from 'react-icons/pi';
import { FaChessKnight } from 'react-icons/fa';

import Reveal from './Reveal';
import { SIDE_QUESTS, SideQuest } from './data';

const ICONS: Record<SideQuest['icon'], React.ComponentType> = {
  go: FaGolang,
  valorant: TbBrandValorant,
  books: PiBooksThin,
  chess: FaChessKnight,
};

// Splits "text {link} text" so the link can sit mid-sentence.
const renderText = ({ text, link }: SideQuest) => {
  if (!link) return text;
  const [before, after] = text.split('{link}');
  return (
    <>
      {before}
      <a className="chunky-underline" href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
      {after}
    </>
  );
};

/** "Off the clock" grid: small cards that cascade in and wiggle their icon on hover. */
const SideQuests: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="about-block">
      <Reveal>
        <h2 className="about-block__title">
          Side quests <span className="about-block__hint sec-font">when the laptop closes</span>
        </h2>
      </Reveal>
      <ul className="side-quests sec-font">
        {SIDE_QUESTS.map((quest, i) => {
          const Icon = ICONS[quest.icon];
          return (
            <motion.li
              key={quest.icon}
              className="side-quests__item"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="side-quests__icon" aria-hidden="true">
                <Icon />
              </span>
              <p className="side-quests__text">{renderText(quest)}</p>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
};

export default SideQuests;
