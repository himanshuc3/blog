import React, { useState } from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import { motion } from 'motion/react';

const ITEMS = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Posts' },
];

/** Nav links with one shared highlight that glides to the hovered (or current) link. */
const NavMenu: React.FC = () => {
  const { pathname } = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);
  const active = ITEMS.find((i) => pathname.startsWith(i.to))?.to ?? null;
  const target = hovered ?? active;

  return (
    <div className="menu sec-font" onMouseLeave={() => setHovered(null)}>
      {ITEMS.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={`link${active === to ? ' active-link' : ''}`}
          onMouseEnter={() => setHovered(to)}
          onFocus={() => setHovered(to)}
          onBlur={() => setHovered(null)}
        >
          {target === to && (
            <motion.span
              layoutId="nav-pill"
              className="nav-pill"
              transition={{ type: 'spring', stiffness: 500, damping: 34 }}
            />
          )}
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavMenu;
