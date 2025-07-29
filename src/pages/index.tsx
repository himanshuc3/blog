import React, { useContext } from 'react';
import type { HeadFC, PageProps } from 'gatsby';

// TODO: Replace with absolute paths
import Socials from '../components/socials';
import Posts from '../components/posts';
import dp from '../images/dp.webp';
import AvailableBadge from '../components/AvailableBadge';
import './styles.scss';
import usePostsData from '../hooks/usePostsData';
import { IPost } from '../utils/types';
import BaseComponent from '../containers/base';
import { ThemeContext } from '../hooks/themeContext';
import { SEO } from '../components/Seo';
import useHoverIsolation from '../hooks/useHoverIsolation';

const IndexPage: React.FC<PageProps> = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  // useHoverIsolation('html', '.post-heading');
  let postsData = usePostsData().sort(
    (p1: IPost, p2: IPost) => p2.date.getTime() - p1.date.getTime()
  );
  postsData.slice(Math.min(3, postsData.length));

  return (
    <BaseComponent className="index-wrapper">
      <div className="content">
        <div className="poster section">
          <div className="text">
            <h1 className="w-sm mb-0 italic">
              <span className="emoji-wave">👋</span> Hi, I’m <span>Himanshu</span>
              <br />
              <span className="title sec-font">
                FULLSTACK DEVELOPER &middot; WEB3 ENTHUSIAST &middot;{' '}
              </span>
            </h1>
            <p className="sec-font mt-0">
              Sharing my 👾 two bits on <i>🕸️ web2 challenges</i>, <i>🔐 web3 journey</i> &{' '}
              <i>🏡 daily infra rants</i>. Building scalable solutions{' '}
              <a href="https://razorpay.com/" target="_blank">
                <span className="working-at">@Razorpay</span>
              </a>
              <br />
              <br />
              Interested in having a chat? Feel free to reach out on my socials.
            </p>
            <Socials isDarkTheme={darkTheme} />
          </div>
          <div className="dp">
            <AvailableBadge />
            <img src={dp} alt="My profile picture" className="image" />
          </div>
        </div>
        <div className="recent-posts section">
          <div className="heading">
            <h1 className="sec-font">Recent Articles</h1>
            <p className="heading_desc sec-font">
              Presenting you with articles fresh out of the oven, decide for yourself if they
              satiate your reading appetite or if I overcooked (most likely).
            </p>
          </div>

          <Posts posts={postsData} />
        </div>
      </div>
    </BaseComponent>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
