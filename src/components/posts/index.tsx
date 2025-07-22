import React from 'react';
import PostListing from '../postListing';
import { IPost } from '../../utils/types';
import './styles.scss';

interface PostsProps {
  posts: IPost[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const PostComponents = posts.map((post) => <PostListing key={post.id} {...post} />);
  return <div className="posts">{PostComponents}</div>;
};

export default Posts;
