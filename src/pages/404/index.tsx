import * as React from 'react';
import { Link, HeadFC, PageProps } from 'gatsby';

import { SEO } from '../../components/Seo';
import BaseComponent from '../../containers/base';

import './styles.scss';

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <BaseComponent className="not-found-wrapper">
      <div className="not-found">
        <h1>404. Page Not found :(</h1>
        <p>
          Weary traveler, you've reached a dead end. <br />
          <Link to="/" className="chunky-underline">
            Go home
          </Link>{' '}
          and get some sleep.
        </p>
      </div>
    </BaseComponent>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <SEO title="404 | Not found" />;
