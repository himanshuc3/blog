import * as React from 'react';
import { Footer, Layout } from '../Scrapbook';
import './styles.scss';

interface Props {
  children: React.ReactNode;
  className: string;
  [key: string]: any;
}

/** Shared page shell for blog pages: the scrapbook nav, noise surface and footer around the content. */
const Skeleton: React.FC<Props> = ({ children, className }) => {
  return (
    <Layout noise>
      <div className={`${className} skeleton`}>{children}</div>
      <Footer />
    </Layout>
  );
};

export default Skeleton;
