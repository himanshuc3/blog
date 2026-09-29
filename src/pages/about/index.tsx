import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import './styles.scss';
import { SEO } from '../../components/Seo';
import BaseComponent from '../../containers/base';
import { AboutHero, SideQuests, StackMarquee, Projects, ContactCta } from '../../components/About';

const AboutPage: React.FC<PageProps> = () => (
  <BaseComponent className="about-wrapper">
    <div className="about-content">
      <AboutHero />
      <SideQuests />
      <StackMarquee />
      <Projects />
      <ContactCta />
    </div>
  </BaseComponent>
);

export default AboutPage;

export const Head: HeadFC = () => (
  <SEO
    title="About Himanshu Chhabra"
    description="Himanshu Chhabra is a senior frontend engineer at QuillBot in New Delhi, obsessed with web performance, accessibility and the small details that make interfaces feel fast. Projects, side quests and how to reach him."
  />
);
