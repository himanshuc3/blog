import React from 'react';
import { Link } from 'gatsby';
import './styles.scss';
import { DATE_OPTS } from '../../utils/constants';
import { StarOutlined, CloudUploadOutlined } from '@ant-design/icons';
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
  const filteredTags = tags.filter((tag) => tag !== 'upcoming');
  function superscript() {
    if (tags.includes('upcoming')) {
      return (
        <Status text="UPCOMING" className="warning">
          <CloudUploadOutlined style={{ marginRight: '3px' }} />
        </Status>
      );
    }

    if (isNewArticle(date)) {
      return (
        <Status text="NEW" className="success">
          <StarOutlined style={{ marginRight: '3px' }} />
        </Status>
      );
    }
    return null;
  }

  return (
    <Link className="post-heading" data-id={id} data-unique={id} to={`/blog/${slug}`}>
      <div className=" meta left" data-id={id}>
        <span className="date sec-font" data-id={id}>
          {date.toLocaleDateString('en-US', DATE_OPTS)}
        </span>
      </div>
      <div data-id={id} className="right">
        <div className="post-tags sec-font" data-id={id}>
          {filteredTags.map((tag, idx) => (
            <span>
              {tag}
              {idx != filteredTags.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </div>
        <h1 className="sec-font heading-title">
          {superscript()}
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default PostListing;
