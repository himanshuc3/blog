import React from 'react';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { motion } from 'motion/react';

import Placeholder from './Placeholder';
import { CONTACT, PROFILE, RESUME_URL, SOCIAL_LINKS } from './data';

const Contact: React.FC = () => (
  <section className="scrap-contact" id="contact">
    <div className="scrap-contact__top">
      <h2 className="grotesk-font">{CONTACT.heading}</h2>
      <p className="script-font">
        {CONTACT.script.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </p>
      <motion.a
        className="scrap-contact__mail grotesk-font"
        href={`mailto:${PROFILE.email}`}
        initial={{ rotate: -8, x: 60, opacity: 0 }}
        whileInView={{ rotate: -6, x: 0, opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ rotate: -2, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 130, damping: 14 }}
      >
        {PROFILE.email}
      </motion.a>
      <div className="scrap-contact__links grotesk-font">
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          Resume ↗
        </a>
        <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
        <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href={SOCIAL_LINKS.X} target="_blank" rel="noopener noreferrer" aria-label="X">
          <FaXTwitter />
        </a>
      </div>
    </div>

    <div className="scrap-contact__hill">
      <div className="scrap-grain" aria-hidden="true" />
      <Placeholder label="cut-out: you + friends on the hill" shape="blob" className="scrap-contact__crew" />
      <p className="script-font scrap-contact__foot">{CONTACT.footnote}</p>
    </div>
  </section>
);

export default Contact;
