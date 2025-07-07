import React from 'react';
import { Link } from 'gatsby';
import './styles.scss';
import { DATE_OPTS } from '../../utils/constants';
import { StarOutlined } from '@ant-design/icons';
import Tag from '../tag';
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
  return (
    <Link className="post-heading" data-id={id} data-unique={id} to={`/blog/${slug}`}>
      <div className=" meta left" data-id={id}>
        <span className="date" data-id={id}>
          {date.toLocaleDateString('en-US', DATE_OPTS)}
        </span>
      </div>
      <div data-id={id} className="right">
        <div className="post-tags sec-font" data-id={id}>
          {tags.map((tag, idx) => (
            <span>
              {tag}
              {idx != tags.length - 1 ? ' - ' : ''}
            </span>
          ))}
        </div>
        <h1 className="sec-font">
          {isNewArticle(date) && (
            <Status text="NEW" className="success">
              <StarOutlined style={{ marginRight: '3px' }} />
            </Status>
          )}
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default PostListing;
