import React from 'react';
import Tag from '../tag';
import './styles.scss';

interface ProjectCardProps {
  project: {
    name: string;
    description: string;
    actions: { name: string; link: string }[];
    keywords: string[];
    tag?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  function handleClick(action: { name: string; link: string }) {
    window.open(action.link, '_blank');
  }

  return (
    <div className="project-card">
      {project.tag && <span className="project-tag sec-font">{project.tag}</span>}
      <h3 className="project-title sec-font">{project.name}</h3>
      <div>
        {project.keywords.map((keyword) => (
          <Tag text={keyword} />
        ))}
      </div>
      <p className="project-description sec-font">{project.description}</p>

      <div className="project-actions sec-font">
        {project.actions.map((action) => (
          <button key={action.name} className="action-button" onClick={() => handleClick(action)}>
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
