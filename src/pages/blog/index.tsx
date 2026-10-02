import React, { useState } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { MdRssFeed } from 'react-icons/md';

import { SEO } from '../../components/Seo';
// The shared layout first, as in templates/BlogArticle.tsx: both pages must import the stylesheets
// in the same order, or webpack can't order the shared CSS chunk and warns about it.
import BaseComponent from '../../containers/base';
import Tag from '../../components/tag';
import { IPost } from '../../utils/types';
import Posts from '../../components/posts';
import Search from '../../components/Search';
import usePostsData from '../../hooks/usePostsData';

import './styles.scss';

const TAGS = ['personal', 'TIL', 'git', 'bash', 'svelte', 'react', 'javascript'];

function getSortedPosts(posts: IPost[]) {
  let postsByYear: { [key: number]: IPost[] } = posts.reduce(
    (acc: { [key: number]: IPost[] }, curr) => {
      const currYear: number = curr.date.getFullYear();
      if (acc[currYear]) {
        acc[currYear].push(curr);
      } else {
        acc[currYear] = [curr];
      }
      return acc;
    },
    {}
  );

  // NOTE: Object.keys serializes ig, always returns strings for keys
  return Object.keys(postsByYear)
    .sort((y1, y2) => +y2 - +y1)
    .map((year): [number, IPost[]] => [+year, postsByYear[+year]]);
}

function filterPostsByTag(postsByYear: Array<[number, IPost[]]>, tag: string) {
  return postsByYear
    .map(([year, posts]) => {
      const filteredPosts: IPost[] = posts.filter((post) => post.tags.includes(tag));
      return [year, filteredPosts];
    })
    .filter(([_, posts]) => Array.isArray(posts) && posts.length);
}

const BlogPage: React.FC<PageProps> = () => {
  const [selectedTag, setSelectedTag] = useState<null | string>(null);
  const [searchText, setSearchText] = useState<string>('');
  let postsData: IPost[] = usePostsData();

  let sortedPosts = getSortedPosts(postsData);
  const [filteredPosts, setFilteredPosts] = useState(sortedPosts);

  function onTagSelect(e: React.SyntheticEvent<HTMLDivElement>) {
    // TODO: Bad code, relying on implementation detail
    if (!(e.target instanceof HTMLSpanElement)) return;
    setSearchText('');

    const tag = e.target.dataset.tag;

    if (typeof tag != 'string') throw new Error('Tag not a string');
    if (tag == selectedTag) {
      setSelectedTag(null);
      setFilteredPosts(sortedPosts);
    } else {
      setSelectedTag(tag);
      setFilteredPosts(filterPostsByTag(sortedPosts, tag));
    }
  }

  function onSearchInput(search: string) {
    setSearchText(search);
    if (search === '') setFilteredPosts(sortedPosts);

    setSelectedTag(null);

    const lowercaseSearch = search.toLowerCase();
    setFilteredPosts(
      sortedPosts
        .map(([key, posts]): [number, IPost[]] => {
          return [
            key,
            posts.filter((post) => post.title.toLowerCase().indexOf(lowercaseSearch) != -1),
          ];
        })
        .filter(([_, posts]) => posts.length > 0)
    );
  }

  const postCount = filteredPosts.reduce((n, [, posts]) => n + posts.length, 0);

  return (
    <BaseComponent className="blog-wrapper">
      <div className="poster section">
        <div className="heading">
          <h1 className="grotesk-font">
            List of blogs
            <span className="count" aria-label={`${postCount} posts`}>
              {postCount}
            </span>
          </h1>
          <span className="script-font">not written by AI</span>
        </div>
        <p className="intro grotesk-font">
          Want to collab on an idea or suggest ideas to my existing blogs? Raise an issue on{' '}
          <a href="https://github.com/himanshuc3/blog/issues" target="_blank" rel="noreferrer">
            github
          </a>
          .
        </p>
        <div className="filter">
          <div className="filter-row">
            <Search onChange={onSearchInput} />
            <a className="rss-button" href="/rss.xml" target="_blank" rel="noreferrer" aria-label="RSS feed">
              <MdRssFeed aria-hidden="true" />
              RSS
            </a>
          </div>
          <div className="tags" onClick={onTagSelect}>
            {TAGS.map((tag) => (
              <Tag key={tag} text={tag} highlighted={selectedTag === tag} />
            ))}
          </div>
        </div>
        {filteredPosts.length == 0 ? (
          <p className="no-posts">I'm out of words for the thing you're trying to search</p>
        ) : (
          <div className="post-list">
            <Posts posts={filteredPosts.flatMap(([, posts]) => posts)} />
          </div>
        )}
      </div>
    </BaseComponent>
  );
};

export default BlogPage;

export const Head: HeadFC = ({ location }) => (
  <SEO
    pathname={location.pathname}
    title="Himanshu's blog"
    description="Chronological list of blogs written by me on technical topics."
  />
);
