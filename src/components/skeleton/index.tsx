import * as React from 'react';
import { Footer, Layout } from '../Scrapbook';
import ReadingProgress from '../ReadingProgress';
import './styles.scss';

interface Props {
  children: React.ReactNode;
  className: string;
  /** Shows a reading-progress bar across the top of the screen (blog posts). */
  isScrollLoader?: boolean;
}

/** Shared page shell for blog pages: the scrapbook nav, noise surface and footer around the content. */
const Skeleton: React.FC<Props> = ({ children, className, isScrollLoader = false }) => {
  return (
    <Layout noise>
      {isScrollLoader && <ReadingProgress />}
      <div className={`${className} skeleton`}>{children}</div>
      <Footer />
    </Layout>
  );
};

export default Skeleton;
