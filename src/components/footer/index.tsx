import * as React from 'react';
import Subscribe from '../subscribe';

import Resume from '../../media/Himanshu_Resume.pdf';
import './styles.scss';
import Socials from '../socials';
import Divider from '../divider';

const Footer = ({ darkTheme }: { darkTheme: boolean }) => {
  return (
    <div id="footer">
      <div>
        <Subscribe />
        <Divider darkTheme={darkTheme} />
        <div className="bottom">
          <a
            href="https://drive.google.com/file/d/1FP0_-j3YMKtRxoqHqJlEh6jozooPkPlw/view?usp=sharing"
            target="_blank"
            className="button"
          >
            Resume
          </a>
          <Socials isDarkTheme={darkTheme} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
