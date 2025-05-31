import * as React from 'react';
// import LinkOutlined from '@ant-design/icons/LinkOutlined';
import Subscribe from '../subscribe';

import Resume from '../../media/Himanshu_Resume.pdf';
import './styles.scss';
import Socials from '../socials';
import Star from '../Star';
const Footer = ({ darkTheme }: { darkTheme: boolean }) => {
  return (
    <div id="footer">
      <div>
        <Subscribe />
        <div className="divider">
          <div className="hr" />
          <Star color={darkTheme ? 'white' : 'black'} />
          <div className="hr" />
        </div>
        <div className="bottom">
          <a href={Resume} target="_blank" className="button">
            Resume
          </a>
          <Socials />
        </div>
      </div>
    </div>
  );
};

export default Footer;
