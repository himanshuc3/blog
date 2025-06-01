import React from 'react';

import github from '../../images/github.png';
import email from '../../images/email.png';
import './styles.scss';

const ProjectCard = ({ project }) => {
  function handleClick(link: string) {
    window.open(link, '_blank');
  }
  return (
    <div className="project-card">
      <h5>{project.name}</h5>
      <p className="sec-font description">
        {project.description}
        <br />
        <div className="tech-stack">
          <span>Tech Stack: &#160;</span>
          {project.techStack.map((tech, index) => (
            <span key={tech}>
              {tech} {index !== project.techStack.length - 1 ? <span>&#183; &#160;</span> : null}
            </span>
          ))}
        </div>
      </p>
      <div className="project-card-links">
        {project.github && (
          <button onClick={() => handleClick(project.github)} className="button">
            <img src={github} alt="github" />
          </button>
        )}
        {project.live && (
          <button onClick={() => handleClick(project.live)} className="button">
            <img src={email} alt="live" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
