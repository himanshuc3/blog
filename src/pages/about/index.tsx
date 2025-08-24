import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { RiGatsbyFill } from 'react-icons/ri';
import { FaReact } from 'react-icons/fa';
import { FaFigma } from 'react-icons/fa';
import { SiNetlify } from 'react-icons/si';
import { FaGolang } from 'react-icons/fa6';
import { TbBrandValorant } from 'react-icons/tb';
import { PiBooksThin } from 'react-icons/pi';

import './styles.scss';
import dp from '../../images/dp.webp';
import { SEO } from '../../components/Seo';
import Socials from '../../components/socials';
import { ThemeContext } from '../../hooks/themeContext';
import BaseComponent from '../../containers/base';
import ProjectCard from '../../components/projectCard';

const projects = [
  {
    name: '🐍 Octosnake',
    description: `A github themed snake game with twists that lure you to score more.`,
    keywords: ['typescript', 'p5.js'],
    actions: [
      {
        name: 'Source',
        link: 'https://github.com/himanshuc3/usb-snake',
      },
    ],
    tag: 'unfinished',
  },
  {
    name: '🗂️ File Organizer',
    description: `A CLI tool to help declutter your assets to help your OCD.`,
    keywords: ['node.js', 'typescript', 'linux'],
    actions: [
      {
        name: 'Source',
        link: 'https://github.com/himanshuc3/file-organize',
      },
      {
        name: 'Demo',
        link: 'https://www.npmjs.com/package/file-organize',
      },
    ],
  },
  {
    name: '📃 Convex hull algorithms',
    description:
      'A paper on proposing constant workspace convex hull algorithms under the guidance of Prof. R. Inkulu.',
    keywords: ['geometry', 'convex hull', 'DSA'],
    actions: [
      {
        name: 'Source',
        link: 'https://arxiv.org/abs/2411.10043',
      },
    ],
  },
];

const AboutPage: React.FC<PageProps> = () => {
  const { darkTheme } = React.useContext(ThemeContext);

  function getCurrentTime() {
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // ensures 24-hour format
    });
    const formattedTime = formatter.format(new Date());
    // Replace the comma with ", New Delhi" and format it properly
    return formattedTime.replace(',', '') + ', India';
  }

  return (
    <BaseComponent className="about-wrapper">
      <div className="about-section sec-font">
        <div className="map">
          <p className="time">{getCurrentTime()} 🇮🇳 </p>
          <p>
            Currently working as a software engineer at Razorpay.
            <br />
            <br />
            Want to colab on something cool? React out on{' '}
            <a
              href="mailto:himichhabra14@gmail.com?subject=I am such a stan of you man!"
              className="chunky-underline"
            >
              himichhabra14@gmail.com
            </a>
          </p>
        </div>
        <div className="photo">
          <div className="profile-photo">
            <img src={dp} alt="My profile picture" className="image" />
          </div>
        </div>
        <div className="chess">
          <p>I have an affinity to blunders in chess.</p>
          <a href="_todo" className="chunky-underline">
            Challenge me?
          </a>
        </div>
        <div className="socials-box">
          <Socials isDarkTheme={darkTheme} />
        </div>
        <div className="powered-by">
          <p>The blog is built on</p>
          <p>
            {' '}
            <RiGatsbyFill /> <SiNetlify />
            <FaReact /> <FaFigma />{' '}
          </p>
        </div>
        <div className="actively">
          <div>
            <span className="icon">
              <FaGolang />
            </span>
            <p>Detecting errors in golang and upgrading to web3</p>
          </div>
          <div>
            <p>
              Countless hours wasted{' '}
              <a
                className="chunky-underline"
                target="_blank"
                href="https://tracker.gg/valorant/profile/riot/dumbriyani%231371/overview?platform=pc&playlist=competitive&season=ac12e9b3-47e6-9599-8fa1-0bb473e5efc7"
              >
                queuing and wiffing
              </a>{' '}
              in valorant
            </p>
            <span className="icon">
              <TbBrandValorant />
            </span>
          </div>
          <div>
            <span className="icon">
              <PiBooksThin />
            </span>
            <p>
              I love reading books but it's hardly reciprocated &mdash; blaming it on my
              self-diagnosed ADHD{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="section projects">
        <h1>
          Projects{' '}
          <a
            className="sec-font projects-all-text"
            href="https://github.com/himanshuc3"
            target="_blank"
          >
            See All
          </a>
        </h1>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </BaseComponent>
  );
};

export default AboutPage;

export const Head: HeadFC = () => (
  <SEO
    title="About Himanshu"
    description="My name is Himanshu Chhabra and I’m speechless to meet you virtually. If you’re a fidgety individual, eternally confused about life and constantly making non optimal life decisions, you’ve found yourself a duplicate. Let’s connect on insta or x."
  />
);
