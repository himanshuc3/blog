import React from 'react';
import { GithubOutlined, LinkOutlined } from '@ant-design/icons';

import './styles.scss';

const ProjectCard = ({ project }) => {
  function handleClick(link: string) {
    window.open(link, '_blank');
  }
  return (
    <div className="project-card">
      <h5>{project.name}</h5>
      <p className="description sec-font">
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
          <button onClick={() => handleClick(project.github)} className="action-btn sec-font">
            <GithubOutlined
              style={{ color: 'var(--variable-textSecondary)', marginRight: '5px' }}
            />
          </button>
        )}
        {project.live && (
          <button onClick={() => handleClick(project.live)} className="action-btn sec-font">
            <LinkOutlined style={{ color: 'var(--variable-textSecondary)', marginRight: '5px' }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
