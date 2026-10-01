import React from 'react';
import { Link } from 'gatsby';
import { motion } from 'motion/react';

import usePostsData from '../../hooks/usePostsData';
import { IPost } from '../../utils/types';
import { WRITING } from './data';

// Where each "file" lands around the heading (% of the section), plus its tilt.
const SPOTS = [
  { left: '9%', top: '8%', rot: -4 },
  { left: '70%', top: '6%', rot: 3 },
  { left: '4%', top: '46%', rot: 2 },
  { left: '76%', top: '38%', rot: -3 },
  { left: '18%', top: '76%', rot: 4 },
  { left: '62%', top: '74%', rot: -2 },
];

const Cursor = () => (
  <svg className="scrap-cursor" width="26" height="30" viewBox="0 0 26 30" aria-hidden="true">
    <path d="M3 2l19 12-8 2-4 9z" fill="#fff" stroke="#151515" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const Writing: React.FC = () => {
  const posts: IPost[] = usePostsData()
    .filter((p: IPost) => !p.tags?.includes('upcoming'))
    .sort((a: IPost, b: IPost) => b.date.getTime() - a.date.getTime())
    .slice(0, SPOTS.length);

  return (
    <section className="scrap-writing" id="writing">
      <div className="scrap-writing__head">
        <span className="script-font">
          {WRITING.script} <i aria-hidden="true">✦</i>
        </span>
        <h2 className="grotesk-font">
          <span>{WRITING.heading[0]}</span>
          <span className="scrap-select">
            {WRITING.heading[1]}
            {['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br'].map((h) => (
              <b key={h} className={`h-${h}`} aria-hidden="true" />
            ))}
            <Cursor />
          </span>
        </h2>
      </div>

      <ul className="scrap-writing__files">
        {posts.map((post, i) => (
          <motion.li
            key={post.id}
            className="scrap-file grotesk-font"
            style={{ left: SPOTS[i].left, top: SPOTS[i].top }}
            initial={{ opacity: 0, scale: 0.8, rotate: SPOTS[i].rot * 3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: SPOTS[i].rot }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ type: 'spring', stiffness: 140, damping: 15, delay: i * 0.08 }}
            whileHover={{ scale: 1.06, rotate: 0 }}
          >
            <Link to={`/blog/${post.slug}`}>
              <span className="scrap-file__icon" aria-hidden="true">
                <i />
              </span>
              <span className="scrap-file__name">{post.title}</span>
              <span className="scrap-file__ext">{post.slug}.md</span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <Link to="/blog" className="scrap-writing__all grotesk-font">
        Browse every post <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
};

export default Writing;
