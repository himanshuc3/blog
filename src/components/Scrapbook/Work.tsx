import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { PROJECTS } from '../About/data';
import { WORK } from './data';

const HUES = [265, 200, 150, 20];

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

// How much of a dragged item must stay inside the card, so it can always be grabbed again. Past
// that it is clipped by the card's edge, like a window dragged half off a screen.
const GRAB_MARGIN = 40;

/** A desktop decoration the visitor can drag around the card; the card clips whatever leaves it. */
const DeskItem: React.FC<{
  desk: React.RefObject<HTMLDivElement>;
  className: string;
  children: React.ReactNode;
}> = ({ desk, className, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [limits, setLimits] = useState<{ top: number; left: number; right: number; bottom: number }>();

  // Drag limits are measured from where the item rests: it may travel until only GRAB_MARGIN px
  // of it are left inside the card. Re-measured whenever the card resizes.
  useEffect(() => {
    const item = ref.current;
    const area = desk.current;
    if (!item || !area) return;
    const measure = () =>
      setLimits({
        left: -item.offsetLeft - (item.offsetWidth - GRAB_MARGIN),
        right: area.clientWidth - item.offsetLeft - GRAB_MARGIN,
        top: -item.offsetTop - (item.offsetHeight - GRAB_MARGIN),
        bottom: area.clientHeight - item.offsetTop - GRAB_MARGIN,
      });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(area);
    return () => observer.disconnect();
  }, [desk]);

  return (
    <motion.div
      ref={ref}
      className={className}
      drag
      dragConstraints={limits}
      dragMomentum={false}
      dragElastic={0}
      whileHover={{ scale: 1.04 }}
      whileDrag={{ scale: 1.07 }}
    >
      {children}
    </motion.div>
  );
};

/** Browser-window project viewer on the page surface, with a dock to jump between them. */
const Work: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const project = PROJECTS[index];
  const today = useMemo(() => new Date(), []);

  // The layer that clips the draggable decorations to the card (see .scrap-work__desk).
  const deskRef = useRef<HTMLDivElement>(null);

  const go = (next: number) =>
    setState(([cur]) => [(next + PROJECTS.length) % PROJECTS.length, next > cur ? 1 : -1]);

  return (
    <section className="scrap-work" id="work">
      <div className="scrap-work__head">
        <h2 className="grotesk-font">{WORK.heading}</h2>
        <span className="script-font">{WORK.script}</span>
      </div>

      <div className="scrap-work__desk" ref={deskRef} aria-hidden="true">
        <DeskItem desk={deskRef} className="scrap-cal grotesk-font">
          <span className="scrap-cal__day">
            {today.toLocaleDateString('en-US', { weekday: 'long' })}
          </span>
          <span className="scrap-cal__num">{today.getDate()}</span>
          <span className="scrap-cal__event">
            <b>Focus block</b>
            <em>Notifications off</em>
            <em>10:00–13:00</em>
          </span>
        </DeskItem>

        <DeskItem desk={deskRef} className="scrap-folder scrap-folder--a grotesk-font">
          <i />
          <span>drafts ✦</span>
        </DeskItem>
        <DeskItem desk={deskRef} className="scrap-folder scrap-folder--b grotesk-font">
          <i />
          <span>unfinished</span>
        </DeskItem>
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
          <span className="scrap-window__url">{host(project.live ?? project.actions[0].link)}</span>
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
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="scrap-window__foot">
          <strong>{project.name}</strong>
          {(project.year ?? project.tag) && (
            <span className="scrap-window__tag">{project.year ?? project.tag}</span>
          )}
          <div className="scrap-window__links">
            {project.actions.map((a) => (
              <a
                key={a.name}
                className={`scrap-window__link${a.primary ? ' scrap-window__link--primary' : ''}`}
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {a.name} ↗
              </a>
            ))}
            {project.live ? (
              <a
                className="scrap-window__link scrap-window__link--primary"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live ↗
              </a>
            ) : (
              project.soon && (
                <span className="scrap-window__link scrap-window__link--soon" aria-disabled="true">
                  Coming soon
                </span>
              )
            )}
          </div>
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
