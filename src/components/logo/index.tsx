import * as React from 'react';
import { Link } from 'gatsby';
import logo from '../../images/logo.png';

import './styles.scss';

const Logo: React.FC<{}> = () => {
  return (
    <Link to="/" className="logo-container">
      <div className="logo">
        <div id="alternate_logo_img">
          <img src={logo} alt="blog logo" />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
