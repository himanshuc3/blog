import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { PROJECTS } from '../About/data';
import { WORK } from './data';

const HUES = [265, 200, 150, 20];

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/** Browser-window project viewer on the page surface, with a dock to jump between them. */
const Work: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const project = PROJECTS[index];
  const today = useMemo(() => new Date(), []);

  const go = (next: number) =>
    setState(([cur]) => [(next + PROJECTS.length) % PROJECTS.length, next > cur ? 1 : -1]);

  return (
    <section className="scrap-work" id="work">
      <div className="scrap-work__head">
        <h2 className="grotesk-font">{WORK.heading}</h2>
        <span className="script-font">{WORK.script}</span>
      </div>

      <aside className="scrap-cal grotesk-font" aria-hidden="true">
        <span className="scrap-cal__day">
          {today.toLocaleDateString('en-US', { weekday: 'long' })}
        </span>
        <span className="scrap-cal__num">{today.getDate()}</span>
        <span className="scrap-cal__event">
          <b>Focus block</b>
          <em>Notifications off</em>
          <em>10:00–13:00</em>
        </span>
      </aside>

      <div className="scrap-folder scrap-folder--a grotesk-font" aria-hidden="true">
        <i />
        <span>drafts ✦</span>
      </div>
      <div className="scrap-folder scrap-folder--b grotesk-font" aria-hidden="true">
        <i />
        <span>unfinished</span>
      </div>

      <div className="scrap-window grotesk-font">
        <div className="scrap-window__bar">
          <span className="scrap-window__lights" aria-hidden="true">
            <i /> <i /> <i />
          </span>
          <button type="button" aria-label="Previous project" onClick={() => go(index - 1)}>
            ←
          </button>
          <button type="button" aria-label="Next project" onClick={() => go(index + 1)}>
            →
          </button>
          <span className="scrap-window__url">{host(project.actions[0].link)}</span>
        </div>

        <div className="scrap-window__viewport">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.article
              key={project.name}
              className="scrap-project"
              style={{ ['--hue' as string]: HUES[index % HUES.length] }}
              custom={dir}
              initial={reduceMotion ? false : { opacity: 0, x: dir * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: dir * -80 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="scrap-project__emoji" aria-hidden="true">
                {project.emoji}
              </span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul className="scrap-project__kw">
                {project.keywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
              <div className="scrap-project__actions">
                {project.actions.map((a) => (
                  <a
                    key={a.name}
                    className="scrap-project__btn"
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {a.name} ↗
                  </a>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="scrap-window__foot">
          <strong>{project.name}</strong>
          <span>{project.keywords.slice(0, 2).join(', ')}</span>
          <span>{project.year ?? project.tag ?? ''}</span>
        </div>
      </div>

      <div className="scrap-dock" role="tablist" aria-label="Projects">
        {PROJECTS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${p.name}`}
            className={i === index ? 'is-on' : ''}
            onClick={() => go(i)}
          >
            <span aria-hidden="true">{p.emoji}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Work;
