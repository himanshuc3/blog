import * as React from 'react';
import { Link } from 'gatsby';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import Logo from '../logo';
import logo from '../../images/logo.png';
import './styles.scss';
import { isBrowser } from '../../utils/helpers';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface Props {
  [key: string]: any;
}

const DEFAULT_THRESHOLD = 100;

const Header: React.FC<Props> = ({ onToggleTheme, darkTheme }) => {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [sticky, setSticky] = React.useState(isBrowser() && window.scrollY >= DEFAULT_THRESHOLD);

  function onScroll() {
    const scrollTop = isBrowser() ? Math.trunc(window.scrollY) : 50;
    // if ((window.scrollY >= DEFAULT_THRESHOLD && !sticky) || (window.scrollY < DEFAULT_THRESHOLD && sticky)) {
    if (scrollTop > 150) {
      setSticky(true);
    } else if (scrollTop < 100) {
      setSticky(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => {
      removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <nav id="navbar" className={sticky ? 'sticky' : ''}>
      <div className="inner">
        <Logo />
        <div className="menu">
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
