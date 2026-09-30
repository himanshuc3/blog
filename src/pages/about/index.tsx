import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../../components/Seo';
import { About, Footer, History, Layout, Work, Writing } from '../../components/Scrapbook';

// The About page opens with "A little about me" as its hero, then the longer story: work history,
// projects. Recent writing is the same module the home page uses.
const AboutPage: React.FC<PageProps> = () => (
  <Layout noise>
    <About hero />
    <History />
    <Work />
    <Writing />
    <Footer />
  </Layout>
);

export default AboutPage;

export const Head: HeadFC = () => (
  <SEO
    title="About Himanshu Chhabra"
    description="Himanshu Chhabra is a senior frontend engineer at QuillBot in New Delhi, obsessed with web performance, accessibility and the small details that make interfaces feel fast. Projects and how to reach him."
  />
);
