import React, { useRef } from 'react';

import usePageScrollLoader from '../../hooks/usePageScrollLoader';
import './styles.scss';

/** A thin bar across the top of the screen that fills as the page is scrolled (used on blog posts). */
const ReadingProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  usePageScrollLoader(barRef);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div className="reading-progress__bar" ref={barRef} />
    </div>
  );
};

export default ReadingProgress;
