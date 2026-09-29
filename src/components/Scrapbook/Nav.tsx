import React from 'react';
import { Link } from 'gatsby';

/** Floating glass pill shared by the scrapbook pages. Gatsby marks the current page `aria-current`. */
const Nav: React.FC = () => (
  <header className="scrap-nav">
    <nav className="scrap-nav__pill grotesk-font" aria-label="Primary">
      <Link className="scrap-nav__mono script-font" to="/" aria-label="Home">
        hc
      </Link>
      <div className="scrap-nav__links">
        <Link className="scrap-nav__link" to="/about" activeClassName="is-current">
          About
        </Link>
        <Link className="scrap-nav__link scrap-nav__link--work" to="/about#work">
          Work
        </Link>
        <Link className="scrap-nav__link" to="/blog" partiallyActive activeClassName="is-current">
          Writing
        </Link>
        <Link className="scrap-nav__cta" to="/about#contact">
          <span className="scrap-nav__cta-long">Let’s </span>chat <span aria-hidden="true">→</span>
        </Link>
      </div>
    </nav>
  </header>
);

export default Nav;
