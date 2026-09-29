import React from 'react';

import ProjectCard from '../projectCard';
import Reveal from './Reveal';
import { PROJECTS } from './data';
import { SOCIAL_LINKS } from '../../utils/constants';

const Projects: React.FC = () => (
  <section className="about-block projects">
    <Reveal className="about-block__head">
      <h2 className="about-block__title">
        Things I've built{' '}
        <span className="about-block__count tertiary-font">({PROJECTS.length})</span>
      </h2>
      <a
        className="about-pill sec-font"
        href={SOCIAL_LINKS.GITHUB}
        target="_blank"
        rel="noopener noreferrer"
      >
        See all on GitHub ↗
      </a>
    </Reveal>
    <div className="projects__grid">
      {PROJECTS.map((project, i) => (
        <ProjectCard key={project.name} project={project} index={i} />
      ))}
    </div>
  </section>
);

export default Projects;
