import React, { useContext } from 'react';
import { graphql } from 'gatsby';

// import {MDXRenderer} from 'gatsby-plugin-mdx'
import { SEO } from '../components/Seo';
import BaseComponent from '../containers/base';
import Comments from '../components/comments';
import ThemeContext from '../hooks/themeContext';
import { MDXProvider } from '@mdx-js/react';
import Tag from '../components/tag';
import { DATE_OPTS } from '../utils/constants';
import './blogStyles.scss';

// require('prismjs/themes/prism-solarizedlight.css');
// require('prismjs/plugins/line-numbers/prism-line-numbers.css');

const components = {
  // h2: (props) => <h1 style={{ color: 'tomato', backgroundColor: 'red' }} {...props} />,
  // Add other custom MDX element overrides here
};

export default function BlogPostTemplate({ data, children }) {
  const { frontmatter } = data.mdx;
  const { darkTheme } = useContext(ThemeContext);

  return (
    <BaseComponent className="blog-post-wrapper" isScrollLoader={true}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.seoDescription}
        keywords={frontmatter.tags}
      />
      <div className="blog-post">
        <MDXProvider components={components}>
          <div className="heading">
            <h1 className="sec-font">{frontmatter.title}</h1>
            <div className="meta">
              <p className="sec-font">
                Written on {new Date(frontmatter.date).toLocaleDateString('en-US', DATE_OPTS)}
              </p>
              <span className="separator">&middot;</span>
              <div className="tags">
                {frontmatter.tags.map((tag) => (
                  <Tag text={tag} />
                ))}
              </div>
            </div>
          </div>
          <div className="content sec-font">{children}</div>
        </MDXProvider>
        <Comments isDarkTheme={darkTheme} />
      </div>
    </BaseComponent>
  );
}

export const pageQuery = graphql`
  query BlogPostById($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        tags
        seoDescription
      }
    }
  }
`;
