import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { MdRssFeed } from 'react-icons/md';
import { FaGithubAlt } from 'react-icons/fa';

import Logo from '../logo';
import './styles.scss';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useNavbarSticky } from '../../hooks/useNavbarSticky';
import usePageScrollLoader from '../../hooks/usePageScrollLoader';

interface Props {
  [key: string]: any;
}

const Header: React.FC<Props> = ({ onToggleTheme, darkTheme, isScrollLoader }) => {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const ref = useRef(null);
  const scrollBarRef = useRef(null);

  useNavbarSticky(ref);
  if (isScrollLoader) {
    usePageScrollLoader(scrollBarRef);
  }
  return (
    <nav id="navbar" ref={ref}>
      <div className="inner">
        <div className="scroll-loader" ref={scrollBarRef}></div>
        {/* <div className="backdrop"></div> */}
        <Logo />
        <div className="menu sec-font">
          <Link to="/about" className="link" activeClassName="active-link">
            About
          </Link>
          <Link to="/blog" className="link" activeClassName="active-link">
            Posts
          </Link>
        </div>
        <div className="header-actions">
          <DarkModeSwitch
            style={{ display: 'inline-block' }}
            checked={!darkTheme}
            sunColor="white"
            moonColor="black"
            onChange={onToggleTheme}
            size={isMobile ? 30 : 20}
          />
          <a className="rss-icon" href="/rss.xml" target="_blank">
            <MdRssFeed size={isMobile ? 34 : 24} color={darkTheme ? 'white' : 'black'} />
          </a>
          <a className="rss-icon" href="https://github.com/himanshuc3/blog" target="_blank">
            <FaGithubAlt size={isMobile ? 30 : 20} color={darkTheme ? 'white' : 'black'} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
