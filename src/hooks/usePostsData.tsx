import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';

interface IEdge {
  node: {
    id: string;
    frontmatter: {
      date: null | string;
      slug: string;
      title: string;
      tags: string[];
    };
  };
}

function usePostsData() {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    query {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            id
            frontmatter {
              date
              slug
              title
              tags
            }
          }
        }
      }
    }
  `);

  return edges
    // Unpublished posts are tagged `upcoming`; they never show up in listings.
    .filter((edge: IEdge) => !!edge.node.frontmatter.date && !edge.node.frontmatter.tags?.includes('upcoming'))
    .map((edge: IEdge) => ({
      id: edge.node.id,
      ...edge.node.frontmatter,
      date: new Date(edge.node.frontmatter.date),
    }));
}

export default usePostsData;
