import React, { useContext } from 'react';
import { graphql } from 'gatsby';

// import {MDXRenderer} from 'gatsby-plugin-mdx'
import { SEO } from '../components/Seo';
import BaseComponent from '../containers/base';
import Comments from '../components/comments';
import ThemeContext from '../hooks/themeContext';
import CodeBlock from '../components/code';
import { MDXProvider } from '@mdx-js/react';
import Tag from '../components/tag';
import { DATE_OPTS } from '../utils/constants';
import InfoQuote from '../components/InfoQuote';
// import BlogSidebar from '../components/BlogSidebar';
import './blogStyles.scss';
const components = {
  pre: (props) => {
    const codeChild = props.children?.props;

    return <CodeBlock {...codeChild} />;
  },
  code: (props) => {
    return <code {...props} />;
  },
  InfoQuote: (props) => {
    return <InfoQuote {...props} />;
  },

  // h2: (props) => {
  //   console.log('pink', props);
  //   return <h1 style={{ color: 'tomato', backgroundColor: 'red' }} {...props} />;
  // },
  // Add other custom MDX element overrides here
};

interface BlogPostProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        date: string;
        tags: string[];
        seoDescription?: string;
      };
      tableOfContents: {
        items: any[];
      };
      body: string;
    };
  };
  children: React.ReactNode;
}

export default function BlogPostTemplate({ data, children }: BlogPostProps) {
  const { frontmatter, tableOfContents } = data.mdx;
  const { darkTheme } = useContext(ThemeContext);

  return (
    <BaseComponent className="blog-post-wrapper" isScrollLoader={true}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.seoDescription}
        keywords={frontmatter.tags}
      />
      <div className="blog-content">
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
        {/* <BlogSidebar tableOfContents={tableOfContents} isDarkTheme={darkTheme} /> */}
      </div>
    </BaseComponent>
  );
}

export const pageQuery = graphql`
  query BlogPostById($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        tags
        seoDescription
      }
      body
      tableOfContents
    }
  }
`;
