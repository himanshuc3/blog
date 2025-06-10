import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import './styles.scss';
import dp from '../../images/dp.png';
import { SEO } from '../../components/Seo';
import Socials from '../../components/socials';
import { SOCIAL_LINKS } from '../../utils/constants';
import { ThemeContext } from '../../hooks/themeContext';
import BaseComponent from '../../containers/base';
import ProjectCard from '../../components/projectCard';
import AvailableBadge from '../../components/AvailableBadge';
const projects = [
  {
    name: '📁 File Organizer',
    description: `A CLI tool to help declutter your assets to help your OCD.`,
    github: 'https://github.com/himanshuc3/file-organize',
    live: 'https://www.npmjs.com/package/file-organize',
    techStack: ['Node.js', 'Typescript', 'Github Actions', 'linux'],
  },
  {
    name: '📝 Convex hull algorithms',
    description: () => (
      <span>
        A paper on proposing constant workspace convex hull algorithms under the guidance of{' '}
        <a href="https://www.iitg.ac.in/rinkulu/" target="_blank" className="chunky-underline">
          Prof. R. Inkulu.
        </a>
      </span>
    ),
    live: 'https://arxiv.org/abs/2411.10043',
    techStack: ['geometry', 'convex hull', 'DSA'],
  },
];

const AboutPage: React.FC<PageProps> = () => {
  const { darkTheme } = React.useContext(ThemeContext);

  return (
    <BaseComponent className="about-wrapper">
      <div className="poster">
        <div className="left">
          <h1>
            <span className="emoji-wave">👋</span> Who am I
          </h1>
          <p className="sec-font">
            My name is <i>Himanshu Chhabra</i> and I’m speechless <br />
            to meet you virtually. <br />
            <br />
            If you’re a fidgety individual, eternally confused about <br /> life and constantly
            making non optimal life decisions, <br /> you’ve found yourself a duplicate. Let’s
            connect on <br />
            <a href={SOCIAL_LINKS.INSTA} target="_blank" className="chunky-underline link">
              insta
            </a>{' '}
            or{' '}
            <a href={SOCIAL_LINKS.X} className="chunky-underline" target="_blank">
              x
            </a>
            . <br /> <br />
            I (usually) write about my learnings and frustations <br /> derived from frontend
            experiences. I also temporarily <br /> plan to write about{' '}
            <a className="chunky-underline" href={'https://nodejs.org/en'} target="_blank">
              node.js
            </a>
            ,{' '}
            <a className="chunky-underline" href={'https://go.dev/'} target="_blank">
              golang
            </a>{' '}
            and everything in <br /> between.
            <br /> <br />
            When annoyed with my state of living, my favorite <br />
            timepass is blaming the environment around <br />
            me which includes location’s aqi, roads among <br /> potholes, lack of sidewalks and
            general infrastructure of the city 🇮🇳
            <br />
            <br />
            Currently putting my day efforts{' '}
            <a href="https://razorpay.com" target="_blank" className="company">
              @Razorpay
            </a>
            .
          </p>
          <Socials isDarkTheme={darkTheme} />
        </div>
        <div className="right dp">
          <AvailableBadge />
          <img src={dp} alt="" className="src" />
        </div>
      </div>
      <div className="section">
        <h1>🧑‍💻 Setup configuration</h1>
        <p className="description sec-font">
          This blog is built on{' '}
          <a href="gatsbyjs.com" target="_blank" className="chunky-underline">
            Gatsby.js
          </a>{' '}
          and hosted on{' '}
          <a href="https://netlify.com" target="_blank" className="chunky-underline">
            Netlify
          </a>{' '}
          and skeleton designed on{' '}
          <a href="www.figma.com" className="chunky-underline">
            figma
          </a>
          .
        </p>
      </div>
      <div className="section projects">
        <h1>🛠️ Projects</h1>
        {projects.map((project, index) => (
          <>
            <ProjectCard key={project.name} project={project} />
            {index !== projects.length - 1 && (
              <div class="project-divider">
                <hr />
              </div>
            )}
          </>
        ))}
      </div>
    </BaseComponent>
  );
};

export default AboutPage;

export const Head: HeadFC = () => (
  <SEO
    title="Get to know me: Himanshu Chhabra"
    description="My name is Himanshu Chhabra and I’m speechless to meet you virtually. If you’re a fidgety individual, eternally confused about life and constantly making non optimal life decisions, you’ve found yourself a duplicate. Let’s connect on insta or x."
  />
);
