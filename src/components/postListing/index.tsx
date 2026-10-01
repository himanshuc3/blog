import React from 'react';
import { Link } from 'gatsby';
import './styles.scss';
import { DATE_OPTS } from '../../utils/constants';
import { FaStar } from 'react-icons/fa6';
import Status from './status';

interface Props {
  id: string;
  title: string;
  date: Date;
  tags: string[];
  slug: string;
}

function isNewArticle(date: Date) {
  const publishedDate = new Date(date);
  const now = Date.now();
  const oneMonthMs = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

  return now - publishedDate.getTime() < oneMonthMs;
}

const PostListing: React.FC<Props> = ({ title, date, tags, id, slug }) => {
  function superscript() {
    if (isNewArticle(date)) {
      return (
        <Status text="NEW" className="success">
          <FaStar style={{ marginRight: '3px' }} />
        </Status>
      );
    }
    return null;
  }

  return (
    <Link className="post-heading" data-id={id} to={`/blog/${slug}`}>
      <time className="post-date script-font" dateTime={new Date(date).toISOString()}>
        {date.toLocaleDateString('en-US', DATE_OPTS)}
      </time>
      <h2 className="heading-title">
        {superscript()}
        {title}
      </h2>
      {tags.length > 0 && (
        <ul className="post-tags" aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
      <span className="post-arrow" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
};

export default PostListing;
