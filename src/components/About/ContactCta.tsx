import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import Reveal from './Reveal';
import { PROFILE } from './data';

/** Closing "let's talk" block with a one-click copy of the email address. */
const ContactCta: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <Reveal className="about-block contact">
      <p className="contact__eyebrow tertiary-font">✦ let's talk</p>
      <h2 className="contact__title">Want to colab on something cool?</h2>
      <div className="contact__row sec-font">
        <a className="contact__email chunky-underline" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
        <button type="button" className="contact__copy" onClick={copy} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? 'done' : 'idle'}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </Reveal>
  );
};

export default ContactCta;
