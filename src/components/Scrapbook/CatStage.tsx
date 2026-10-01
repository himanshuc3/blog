import React, { useState } from 'react';
import { Link } from 'gatsby';
import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { SiClaude, SiGatsby, SiGithub, SiNetlify, SiPopos, SiReact } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

import CatHero, { Zone } from './CatHero';
import { RESUME_URL, SIGNALS, SOCIAL_LINKS } from './data';

interface SignalProps {
  zone: Zone;
  title: string;
  active: boolean;
  onHover: (zone: Zone | null) => void;
  children: React.ReactNode;
}

/**
 * A script title beside the cat. It carries a pulsing dot, and the chips under it open (with the
 * title lit up) when the cat looks this way or the title is hovered, focused or tapped.
 */
const Signal: React.FC<SignalProps> = ({ zone, title, active, onHover, children }) => {
  const [tapped, setTapped] = useState(false);
  const open = active || tapped;
  return (
    <div
      className={`scrap-signal scrap-signal--${zone}${open ? ' is-open' : ''}`}
      onPointerEnter={() => onHover(zone)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(zone)}
      onBlur={() => onHover(null)}
    >
      <button
        type="button"
        className="scrap-signal__title script-font"
        aria-expanded={open}
        onClick={() => setTapped((t) => !t)}
      >
        <span className="scrap-signal__dot" aria-hidden="true" />
        {title}
      </button>
      <div className="scrap-signal__detail grotesk-font">{children}</div>
    </div>
  );
};

const SOCIALS = [
  { name: 'GitHub', href: SOCIAL_LINKS.GITHUB, Icon: FaGithub },
  { name: 'X', href: SOCIAL_LINKS.X, Icon: FaXTwitter },
  { name: 'LinkedIn', href: SOCIAL_LINKS.LINKEDIN, Icon: FaLinkedinIn },
];

interface Tool {
  name: string;
  /** The product's own page. */
  href: string;
  Icon: IconType;
  /** Brand colour of the glyph; omit to use the page's ink (right for GitHub's black). */
  color?: string;
}

const STACK: Tool[] = [
  { name: 'Gatsby', href: 'https://www.gatsbyjs.com/', Icon: SiGatsby, color: '#8c4fd0' },
  { name: 'React', href: 'https://react.dev/', Icon: SiReact, color: '#00b4d8' },
  { name: 'Claude', href: 'https://claude.ai/', Icon: SiClaude, color: '#d97757' },
  { name: 'Pop!_OS', href: 'https://system76.com/pop/', Icon: SiPopos, color: '#2fa6b5' },
  { name: 'VS Code', href: 'https://code.visualstudio.com/', Icon: VscVscode, color: '#2b8fd6' },
  { name: 'GitHub', href: 'https://github.com/', Icon: SiGithub },
  { name: 'Netlify', href: 'https://www.netlify.com/', Icon: SiNetlify, color: '#00b5a8' },
];

/** The cat, with a signal on its left, right and below it. */
const CatStage: React.FC = () => {
  const [gaze, setGaze] = useState<Zone | null>(null);
  const [hover, setHover] = useState<Zone | null>(null);
  // A hovered sticker wins over where the cursor happens to be pointing.
  const current = hover ?? gaze;

  return (
    <div className="scrap-stage">
      <CatHero onZone={setGaze} focus={hover} />

      <Signal
        zone="left"
        title={SIGNALS.left.title}
        active={current === 'left'}
        onHover={setHover}
      >
        <a className="scrap-signal__link" href={RESUME_URL} target="_blank" rel="noreferrer">
          Resume <span aria-hidden="true">↗</span>
        </a>
        <Link className="scrap-signal__link" to="/about#history">
          Where I&rsquo;ve worked <span aria-hidden="true">→</span>
        </Link>
      </Signal>

      <Signal
        zone="right"
        title={SIGNALS.right.title}
        active={current === 'right'}
        onHover={setHover}
      >
        {SOCIALS.map(({ name, href, Icon }) => (
          <a
            key={name}
            className="scrap-signal__chip"
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={name}
            title={name}
          >
            <Icon aria-hidden="true" />
          </a>
        ))}
      </Signal>

      <Signal
        zone="below"
        title={SIGNALS.below.title}
        active={current === 'below'}
        onHover={setHover}
      >
        {STACK.map(({ name, href, Icon, color }) => (
          <a
            key={name}
            className="scrap-signal__tech"
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={name}
            data-tip={name}
            style={color ? ({ ['--tech-color' as string]: color } as React.CSSProperties) : undefined}
          >
            <Icon aria-hidden="true" />
          </a>
        ))}
      </Signal>
    </div>
  );
};

export default CatStage;
