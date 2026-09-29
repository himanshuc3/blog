import React from 'react';
import { SiTypescript, SiSass, SiFramer, SiNetlify } from 'react-icons/si';
import { FaReact, FaFigma } from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { RiGatsbyFill } from 'react-icons/ri';

import { STACK } from './data';

const ICONS: Record<(typeof STACK)[number], React.ComponentType> = {
  TypeScript: SiTypescript,
  React: FaReact,
  Go: FaGolang,
  Gatsby: RiGatsbyFill,
  Sass: SiSass,
  Motion: SiFramer,
  Netlify: SiNetlify,
  Figma: FaFigma,
};

/** Infinite, pause-on-hover ticker of tools. The list is rendered twice for a seamless loop. */
const StackMarquee: React.FC = () => (
  <section className="about-block stack" aria-label="Tools I reach for">
    <p className="stack__label tertiary-font">tools i reach for</p>
    <div className="stack__viewport">
      <ul className="stack__track sec-font">
        {[0, 1].map((copy) =>
          STACK.map((name) => {
            const Icon = ICONS[name];
            return (
              <li key={`${copy}-${name}`} aria-hidden={copy === 1 || undefined}>
                <Icon /> {name}
              </li>
            );
          })
        )}
      </ul>
    </div>
  </section>
);

export default StackMarquee;
