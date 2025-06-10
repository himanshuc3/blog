import * as React from 'react';
import logo from '../../images/logo.png';
import './styles.scss';
import { Link } from 'gatsby';

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
