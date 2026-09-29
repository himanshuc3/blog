import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import Scrapbook from '../components/Scrapbook';
import { SEO } from '../components/Seo';

const IndexPage: React.FC<PageProps> = () => <Scrapbook />;

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
