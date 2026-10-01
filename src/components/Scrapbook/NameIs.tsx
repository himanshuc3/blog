import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { saveDataOn, whenPageIdle } from '../../utils/idle';
import { NAME_IS } from './data';

interface Pop {
  id: number;
  x: number;
  y: number;
  rotate: number;
  size: number;
}

/**
 * The "my name is" easter egg. It plays while the name is hovered and stops the moment the
 * pointer leaves. Returns:
 *  - `trigger(source, on)` to switch a named trigger (currently only 'name')
 *  - `playing` (audio is running) and `flash` (a cue is on screen right now)
 *  - `overlay`, the random text pops, to render once
 */
export function useNameIs() {
  const reduceMotion = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef(0);
  const nextCue = useRef(0);
  const wanted = useRef(false);
  const failed = useRef(false);
  const seq = useRef(0);
  const sources = useRef(new Set<string>());
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const [pops, setPops] = useState<Pop[]>([]);
  const [playing, setPlaying] = useState(false);

  const stop = useCallback(() => {
    wanted.current = false;
    cancelAnimationFrame(rafRef.current);
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = NAME_IS.start;
    }
    setPops([]);
    setPlaying(false);
  }, []);

  const spawn = useCallback(() => {
    const id = (seq.current += 1);
    const pop: Pop = {
      id,
      x: 4 + Math.random() * 68, // % of viewport width; leaves room for the text
      y: 12 + Math.random() * 76,
      rotate: -14 + Math.random() * 28,
      size: 2 + Math.random() * 3.2, // rem
    };
    setPops((p) => [...p, pop]);
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      setPops((p) => p.filter((q) => q.id !== id));
    }, NAME_IS.popMs);
    timers.current.add(timer);
  }, []);

  // Warm the browser's cache with the song once the page is quiet, so the first hover plays it
  // straight from the cache instead of waiting on the download. A plain fetch, not an <Audio>
  // element: building a media element during load costs main-thread time for no benefit.
  useEffect(() => {
    if (saveDataOn()) return;
    return whenPageIdle(() => {
      fetch(NAME_IS.src, { priority: 'low' } as RequestInit).catch(() => {});
    });
  }, []);

  const start = useCallback(() => {
    if (failed.current || wanted.current) return;
    wanted.current = true;
    if (!audioRef.current) {
      const audio = new Audio(NAME_IS.src);
      audio.volume = NAME_IS.volume;
      audio.preload = 'auto';
      // Missing/undecodable file: give up quietly instead of retrying on every hover.
      audio.addEventListener('error', () => {
        failed.current = true;
        stop();
      });
      audioRef.current = audio;
    }
    const audio = audioRef.current;
    audio.currentTime = NAME_IS.start;
    nextCue.current = NAME_IS.cues.findIndex((c) => c >= NAME_IS.start);
    if (nextCue.current < 0) nextCue.current = NAME_IS.cues.length;

    // Browsers refuse audio until the visitor has interacted with the page; that rejects here.
    audio.play().then(
      () => {
        // The trigger may have let go while the browser was starting playback.
        if (!wanted.current) {
          audio.pause();
          return;
        }
        setPlaying(true);
        const loop = () => {
          const t = audio.currentTime;
          while (nextCue.current < NAME_IS.cues.length && t >= NAME_IS.cues[nextCue.current]) {
            spawn();
            nextCue.current += 1;
          }
          if (audio.ended || t >= NAME_IS.end) {
            stop();
            return;
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      },
      () => {
        wanted.current = false;
      },
    );
  }, [spawn, stop]);

  const trigger = useCallback(
    (source: string, on: boolean) => {
      const set = sources.current;
      if (on) set.add(source);
      else set.delete(source);
      if (set.size > 0) start();
      else if (wanted.current) stop();
    },
    [start, stop],
  );

  useEffect(() => stop, [stop]);

  const overlay = (
    <div className="scrap-nameis" aria-hidden="true">
      <AnimatePresence>
        {pops.map((p) => (
          <motion.span
            key={p.id}
            className="scrap-nameis__pop script-font"
            style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: `${p.size}rem`, rotate: p.rotate }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={{ type: 'spring', stiffness: 500, damping: 18, duration: 0.2 }}
          >
            {NAME_IS.text}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );

  return { trigger, playing, flash: pops.length > 0, overlay: <>{overlay}<NowPlaying show={playing} /></> };
}

/** Now-playing card pinned to the bottom centre of the screen while the song runs. */
const NowPlaying: React.FC<{ show: boolean }> = ({ show }) => {
  const reduceMotion = useReducedMotion();
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="scrap-nowplaying grotesk-font"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24, transition: { duration: 0.15 } }}
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
        >
          <span className="scrap-disc" />
          <span className="scrap-nowplaying__text">
            <span className="scrap-nowplaying__title">{NAME_IS.title}</span>
            <span className="scrap-nowplaying__meta">
              <b>{NAME_IS.artist}</b>
              <span>·</span>
              <i>{NAME_IS.album}</i>
              <span>·</span>
              <em>{NAME_IS.year}</em>
            </span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
