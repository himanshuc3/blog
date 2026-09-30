import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { SEO } from '../../components/Seo';
import { SideQuests, StackMarquee } from '../../components/About';
import { About, Contact, Layout, Work, Writing } from '../../components/Scrapbook';

// The About page opens with "A little about me" as its hero, then the longer story: side quests,
// stack, projects. Recent writing is the same module the home page uses.
const AboutPage: React.FC<PageProps> = () => (
  <Layout noise>
    <About hero />
    <section className="scrap-extras">
      <div className="about-content">
        <SideQuests />
        <StackMarquee />
      </div>
    </section>
    <Work />
    <Writing />
    <Contact />
  </Layout>
);

export default AboutPage;

export const Head: HeadFC = () => (
  <SEO
    title="About Himanshu Chhabra"
    description="Himanshu Chhabra is a senior frontend engineer at QuillBot in New Delhi, obsessed with web performance, accessibility and the small details that make interfaces feel fast. Projects, side quests and how to reach him."
  />
);
