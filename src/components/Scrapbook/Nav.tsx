import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { FiFeather, FiGithub, FiHome, FiMoon, FiSun, FiUser } from 'react-icons/fi';

import ThemeContext from '../../hooks/themeContext';
import { SOCIAL_LINKS } from './data';

/** Small floating dock of icon buttons shared by the scrapbook pages. Gatsby marks the current page `aria-current`. */
const Nav: React.FC = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="scrap-nav">
      <nav className="scrap-nav__pill" aria-label="Primary">
        <Link className="scrap-nav__item" to="/" aria-label="Home" data-tip="Home" activeClassName="is-current">
          <FiHome aria-hidden="true" />
        </Link>
        <Link className="scrap-nav__item" to="/about" aria-label="About" data-tip="About" activeClassName="is-current">
          <FiUser aria-hidden="true" />
        </Link>
        <Link
          className="scrap-nav__item"
          to="/blog"
          aria-label="Writing" data-tip="Writing"
          partiallyActive
          activeClassName="is-current"
        >
          <FiFeather aria-hidden="true" />
        </Link>
        <a
          className="scrap-nav__item"
          href={SOCIAL_LINKS.GITHUB}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub" data-tip="GitHub"
        >
          <FiGithub aria-hidden="true" />
        </a>
        <button
          type="button"
          className="scrap-nav__item"
          onClick={toggleTheme}
          aria-label={darkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
          data-tip={darkTheme ? 'Light theme' : 'Dark theme'}
        >
          {darkTheme ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
      </nav>
    </header>
  );
};

export default Nav;
