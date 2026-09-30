import React from 'react';
import { motion } from 'motion/react';

import { WORK_HISTORY } from './data';

/** Work history as a hairline-divided table: period, organisation and role, optional logo. */
const History: React.FC = () => (
  <section className="scrap-history" id="history" aria-labelledby="history-title">
    <motion.h2
      id="history-title"
      className="scrap-history__title grotesk-font"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="scrap-history__heading">Experience</span>
      <span className="scrap-history__script script-font">building 1&ndash;10</span>
    </motion.h2>
    <ul className="scrap-history__list grotesk-font">
      {WORK_HISTORY.map((row, i) => (
        <motion.li
          key={`${row.org}-${row.period}`}
          className="scrap-history__row"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="scrap-history__period script-font">{row.period}</span>
          <span className="scrap-history__what">
            <span className="scrap-history__org">{row.org}</span>
            <span className="scrap-history__dot" aria-hidden="true">
              ·
            </span>
            <span className="scrap-history__role">{row.role}</span>
            {row.note && <span className="scrap-history__note">{row.note}</span>}
          </span>
          {row.logo && <img
              className={`scrap-history__logo${row.lightenOnDark ? ' is-lighten' : ''}`}
              src={row.logo}
              alt={`${row.org} logo`}
            />}
        </motion.li>
      ))}
    </ul>
  </section>
);

export default History;
