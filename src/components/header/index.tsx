import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import Logo from '../logo';
import './styles.scss';
import { debounce, isBrowser } from '../../utils/helpers';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useNavbarSticky } from '../../hooks/useNavbarSticky';

interface Props {
  [key: string]: any;
}

const DEFAULT_THRESHOLD = 50;

const Header: React.FC<Props> = ({ onToggleTheme, darkTheme }) => {
  const isMobile = useMediaQuery('(max-width: 900px)');
  // const ref = useRef(null);
  // const { isIntersecting } = useNavbarSticky(ref);

  return (
    <nav id="navbar">
      <div className="backdrop"></div>
      <div className="inner">
        <Logo />
        <div className="menu sec-font">
          <Link to="/about" className="link" activeClassName="active-link">
            About
          </Link>
          <Link to="/blog" className="link" activeClassName="active-link">
            Blog
          </Link>
          <div className="theme-switch-container">
            <DarkModeSwitch
              style={{ display: 'inline-block' }}
              checked={!darkTheme}
              sunColor="#f7e018"
              moonColor="black"
              onChange={onToggleTheme}
              size={isMobile ? 30 : 20}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
