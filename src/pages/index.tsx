import React, { useEffect, useContext, useState } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

// TODO: Replace with absolute paths
import Socials from '../components/socials';
import Posts from '../components/posts';
import dp from '../images/dp.png';

import './styles.scss';
import usePostsData from '../hooks/usePostsData';
import { IPost } from '../utils/types';
import BaseComponent from '../containers/base';

const IndexPage: React.FC<PageProps> = () => {
  let postsData = usePostsData().sort(
    (p1: IPost, p2: IPost) => p2.date.getTime() - p1.date.getTime()
  );
  postsData.slice(Math.min(3, postsData.length));

  return (
    <BaseComponent className="index-wrapper">
      <div className="content">
        <div className="poster section">
          <div className="text">
            <h1>
              <span className="emoji-wave">👋</span> Hi, I’m{' '}
              <span className="chunky-underline">Himanshu</span>
            </h1>
            <p className="ibm-plex-mono">
              Building UI interfaces 🎨 and engineering{' '}
              <a href="https://razorpay.com/" target="_blank">
                <span className="working-at">@Razorpay</span>
              </a>
              .<i> Writing</i> about my technical experiences & <i>daily infra rants.</i>
            </p>
            <Socials />
          </div>
          <div className="dp">
            <img src={dp} alt="My profile picture" className="image" />
          </div>
        </div>
        <div className="recent-posts section">
          <div className="heading">
            <h1>🕮 Recent Articles</h1>
            <p className="heading_desc ibm-plex-mono">
              Presenting you with articles fresh out of the oven, decide for yourself if they
              satiate your reading appetite 🤓 or if I 🔥 overcooked (most likely).
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
  <Helmet>
    <title>Himanshu's bin.</title>
    <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
    <meta name="description" content="Himanshu Chhabra's blog/portfolio" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>
);
