import React from 'react';
import {
  MailOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  WifiOutlined,
} from '@ant-design/icons';

import './styles.scss';
import { SOCIAL_LINKS } from '../../utils/constants';

const SOCIALS: { src: React.ComponentType; to: string }[] = [
  {
    src: TwitterOutlined,
    to: SOCIAL_LINKS.X,
  },
  {
    src: GithubOutlined,
    to: SOCIAL_LINKS.GITHUB,
  },
  {
    src: LinkedinOutlined,
    to: SOCIAL_LINKS.LINKEDIN,
  },
  {
    src: MailOutlined,
    to: 'mailto:himanshu_chhabra@outlook.com?subject=I am such a stan of you man!',
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
