import React, { useEffect, useRef, useState } from 'react';
import { SiClaude } from 'react-icons/si';
import { FiArrowUpRight } from 'react-icons/fi';

import { PROFILE, SOCIAL_LINKS } from './data';

const THANKS = [
  'Thanks',
  'Arigatou',
  'Shukriya',
  'Gracias',
  'Merci',
  'Danke',
  'Obrigado',
  'Xie xie',
  'Dhanyavaad',
  'Grazie',
];

const EMOJIS = ['❤️', '🙏', '🎉', '🥳', '🫶', '💖', '✨', '😊'];

interface Bubble {
  id: number;
  emoji: string;
  left: number;
  drift: number;
  size: number;
}

const SOCIALS = [
  { label: 'LinkedIn', href: SOCIAL_LINKS.LINKEDIN },
  { label: 'Twitter', href: SOCIAL_LINKS.X },
  { label: 'Instagram', href: SOCIAL_LINKS.INSTAGRAM },
  { label: 'GitHub', href: SOCIAL_LINKS.GITHUB },
  { label: 'Email', href: `mailto:${PROFILE.email}` },
];

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/** Live IST clock, HH:MM:SS. Empty on the server so hydration never mismatches. */
const Clock: React.FC = () => {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(timeFormat.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className="scrap-footer__time" dateTime={now ?? undefined}>
      {now ?? '--:--:--'} [GMT +5:30]
    </time>
  );
};

/** "Thanks for visiting", with "Thanks" cycling through other languages. */
const Footer: React.FC = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % THANKS.length), 2200);
    return () => clearInterval(id);
  }, []);

  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      const bubble: Bubble = {
        id: nextId.current++,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: 15 + Math.random() * 70,
        drift: (Math.random() - 0.5) * 60,
        size: 1 + Math.random() * 0.8,
      };
      setBubbles((list) => [...list.slice(-8), bubble]);
    }, 650);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="scrap-footer">
      <div className="scrap-footer__thanks">
        <h2 className="scrap-footer__title script-font" aria-label="Thanks for visiting">
          <span className="scrap-footer__rest" aria-hidden="true">
            <span className="scrap-footer__slot">
              {THANKS.map((w) => (
                <span key={w} className="scrap-footer__sizer">
                  {w}
                </span>
              ))}
              <span key={i} className="scrap-footer__word">
                {THANKS[i]}
              </span>
            </span>{' '}
            for visiting
          </span>
        </h2>
        <div className="scrap-footer__bubbles" aria-hidden="true">
          {bubbles.map((b) => (
            <span
              key={b.id}
              className="scrap-footer__bubble"
              style={
                {
                  left: `${b.left}%`,
                  fontSize: `${b.size}em`,
                  '--drift': `${b.drift}px`,
                } as React.CSSProperties
              }
              onAnimationEnd={() => setBubbles((list) => list.filter((x) => x.id !== b.id))}
            >
              {b.emoji}
            </span>
          ))}
        </div>
      </div>

      <section className="scrap-footer__connect">
        <p className="scrap-footer__invite grotesk-font">
          If you want to collab or just want to grab a coffee, feel free to reach
          out.
        </p>
        <ul className="scrap-footer__socials grotesk-font">
          {SOCIALS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {label}
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="scrap-footer__bar">
        <div className="scrap-footer__left">
          <Clock />
          <span className="scrap-footer__name">HIMANSHU CHHABRA</span>
        </div>
        <p className="scrap-footer__built">
          Built by <SiClaude className="scrap-footer__logo" aria-label="Claude" /> and proompt
          engineering
        </p>
      </div>
    </footer>
  );
};

export default Footer;
