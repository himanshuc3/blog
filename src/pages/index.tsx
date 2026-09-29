import React, { useContext, useEffect } from 'react';
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
import Hero from '../components/Hero';

// const displayName = 'Himanshu';

const IndexPage: React.FC<PageProps> = () => {
  const { darkTheme } = useContext(ThemeContext);
  // const [tertiaryLetterIndexes, setTertiaryLetterIndexes] = React.useState<number[]>([]);
  let postsData = usePostsData().sort(
    (p1: IPost, p2: IPost) => p2.date.getTime() - p1.date.getTime()
  );
  postsData.slice(Math.min(3, postsData.length));


 

  return (
    <BaseComponent className="index-wrapper">
      <div className="content">
        <Hero />
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
    description="Hi, I'm Himanshu Chhabra - a fullstack developer at Quillbot sharing insights on JavaScript, Golang, computational geometry, and web3. Explore my technical blog with tutorials, rants, and industry experiences."
    keywords={[
      'Himanshu Chhabra',
      'fullstack developer',
      'JavaScript',
      'Golang',
      'React',
      'web development',
      'Quillbot',
      'web3',
      'computational geometry',
      'technical blog',
    ]}
  />
);
