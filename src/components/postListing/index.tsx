import React from 'react';
import { Link } from 'gatsby';
import './styles.scss';
import { DATE_OPTS } from '../../utils/constants';
import Tag from '../tag';

interface Props {
  id: string;
  title: string;
  date: Date;
  tags: string[];
  slug: string;
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
        <h1 className="sec-font">{title}</h1>
        <div className="tags sec-font" data-id={id}>
          {tags.map((tag) => (
            <Tag text={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PostListing;
