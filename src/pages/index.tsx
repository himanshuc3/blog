import React, { useContext } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Link } from 'gatsby';

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

const IndexPage: React.FC<PageProps> = () => {
  const { darkTheme } = useContext(ThemeContext);
  let postsData = usePostsData().sort(
    (p1: IPost, p2: IPost) => p2.date.getTime() - p1.date.getTime()
  );
  postsData.slice(Math.min(3, postsData.length));

  return (
    <BaseComponent className="index-wrapper">
      <div className="content">
        <div className="poster section">
          <div className="text">
            <h1 className="w-sm mb-0">
              <span className="emoji-wave">👋</span> Hi, I’m <span>Himanshu</span>
              <br />
              <span className="title sec-font">
                FULLSTACK DEVELOPER &middot; WEB3 ENTHUSIAST &middot;{' '}
              </span>
            </h1>
            <p className="sec-font mt-0">
              Welcome to the clumsily built, un-optimized blog of a software engineer (I'm
              learning).
              <br />
              <br />
              Based out of 🧭 New Delhi &mdash; currently working{' '}
              <a href="https://razorpay.com/" target="_blank">
                <span className="working-at">@Razorpay</span>
              </a>
              <br />
              <br />
              Want to have a chat? Feel free to reach out on{' '}
              <a
                href="mailto:himichhabra14@gmail.com?subject=I am such a stan of you man!"
                className="chunky-underline"
              >
                himichhabra14@gmail.com
              </a>
              .
            </p>
          </div>
          <div className="dp">
            <div className="img-container">
              <AvailableBadge />
              <img src={dp} alt="My profile picture" className="image" />
            </div>
          </div>
        </div>
        <div className="recent-posts section">
          <div className="heading">
            <h1>
              Recent Articles{' '}
              <Link className="sec-font articles-all-text" to="/blog">
                See All
              </Link>
            </h1>
            <p className="heading_desc sec-font">
              Wish to{' '}
              <a href="/rss.xml" className="chunky-underline" target="_blank">
                subscribe to my digest
              </a>{' '}
              of curiosities underlined with foolishness?
            </p>
          </div>

          <Posts posts={postsData} />
        </div>
      </div>
    </BaseComponent>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO
    title="Himanshu's Bin | Fullstack Developer & Web3 Enthusiast"
    description="Hi, I'm Himanshu Chhabra - a fullstack developer at Razorpay sharing insights on JavaScript, Golang, computational geometry, and web3. Explore my technical blog with tutorials, rants, and industry experiences."
    keywords={[
      'Himanshu Chhabra',
      'fullstack developer',
      'JavaScript',
      'Golang',
      'React',
      'web development',
      'Razorpay',
      'web3',
      'computational geometry',
      'technical blog',
    ]}
  />
);
