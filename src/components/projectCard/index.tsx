import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

import Tag from '../tag';
import { useSpotlight } from '../../hooks/useSpotlight';
import './styles.scss';

export interface Project {
  name: string;
  description: string;
  actions: { name: string; link: string }[];
  keywords: string[];
  tag?: string;
  emoji?: string;
  year?: string;
}

interface ProjectCardProps {
  project: Project;
  /** Position in the list; drives the "01" label and the stagger delay. */
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  useSpotlight(ref);

  return (
    <motion.article
      ref={ref}
      className="project-card"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-glow" aria-hidden="true" />

      <div className="project-meta sec-font">
        <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
        {project.year && <span className="project-year">{project.year}</span>}
        {project.tag && <span className="project-tag">{project.tag}</span>}
      </div>

      <h3 className="project-title sec-font">
        {project.emoji && (
          <span className="project-emoji" aria-hidden="true">
            {project.emoji}
          </span>
        )}
        {project.name}
      </h3>
      <p className="project-description sec-font">{project.description}</p>

      <div className="project-keywords">
        {project.keywords.map((keyword) => (
          <Tag key={keyword} text={keyword} />
        ))}
      </div>

      <div className="project-actions sec-font">
        {project.actions.map((action) => (
          <a
            key={action.name}
            className="action-button"
            href={action.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {action.name} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
