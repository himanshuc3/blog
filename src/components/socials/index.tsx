import React from 'react';
import {
  MailOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  InstagramOutlined,
  WifiOutlined,
} from '@ant-design/icons';

import email from '../../images/email.png';
import github from '../../images/github.png';
import instagram from '../../images/instagram.png';
import linkedin from '../../images/linkedin.png';
import x from '../../images/x.png';
import rssfeed from '../../images/rss.png';
import './styles.scss';
import { SOCIAL_LINKS } from '../../utils/constants';

interface Props {}

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
    src: InstagramOutlined,
    to: SOCIAL_LINKS.INSTA,
  },
  {
    src: WifiOutlined,
    to: '/rss.xml',
  },
  {
    src: MailOutlined,
    to: 'mailto:himanshu_chhabra@outlook.com?subject=I am such a stan of you man!',
  },
];

const Socials = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  console.log(isDarkTheme);
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
