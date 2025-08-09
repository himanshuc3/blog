import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { FaGithubAlt } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';

import './styles.scss';
import { SOCIAL_LINKS } from '../../utils/constants';

const SOCIALS: { src: React.ComponentType; to: string }[] = [
  {
    src: FaTwitter,
    to: SOCIAL_LINKS.X,
  },
  {
    src: FaGithubAlt,
    to: SOCIAL_LINKS.GITHUB,
  },
  {
    src: FaLinkedinIn,
    to: SOCIAL_LINKS.LINKEDIN,
  },
];

const Socials = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  return (
    <div className="socials">
      {SOCIALS.map(({ src: Src, to }) => (
        <a href={to} target="__blank" className="social-icon">
          <Src style={{ color: isDarkTheme ? '#fff' : '#000' }} />
        </a>
      ))}
    </div>
  );
};

export default Socials;
