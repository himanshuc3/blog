import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

import './styles.scss';

const Logo: React.FC<{}> = () => {
  return (
    <Link to="/" className="logo-container">
      <div className="logo">
        <div id="alternate_logo_img">
          <StaticImage src="../../images/logo.png" alt="blog logo" />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
