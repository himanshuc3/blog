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
import './blogStyles.scss';
interface ComponentProps {
  children?: React.ReactNode;
  [key: string]: any;
}

interface BlogPostTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        seoDescription: string;
        tags: string[];
        date: string;
        slug: string;
      };
    };
  };
  children: React.ReactNode;
}

const components = {
  pre: (props: ComponentProps) => {
    const codeChild = React.isValidElement(props.children) ? props.children.props : {};

    return <CodeBlock {...codeChild} />;
  },
  code: (props: ComponentProps) => {
    return <code {...props} />;
  },
  table: (props: ComponentProps) => (
    <div className="table-wrapper">
      <table {...props} />
    </div>
  ),
  InfoQuote: (props: any) => {
    return <InfoQuote {...props} />;
  },
};

export default function BlogPostTemplate({ data, children }: BlogPostTemplateProps) {
  const { frontmatter } = data.mdx;
  const { darkTheme } = useContext(ThemeContext);

  return (
    <BaseComponent className="blog-post-wrapper" isScrollLoader={true}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.seoDescription}
        keywords={frontmatter.tags}
        pathname={`/blog/${frontmatter.slug}`}
        article={{
          publishedTime: new Date(frontmatter.date).toISOString(),
          modifiedTime: new Date(frontmatter.date).toISOString(),
          author: 'Himanshu Chhabra',
          tags: frontmatter.tags,
        }}
      />
      <div className="blog-post">
        <MDXProvider components={components}>
          <div className="heading">
            <h1>{frontmatter.title}</h1>
            <div className="meta">
              <p className="sec-font">
                Published on {new Date(frontmatter.date).toLocaleDateString('en-US', DATE_OPTS)}
              </p>
              <span className="separator">&middot;</span>
              <div className="tags">
                {frontmatter.tags.map((tag: string, index: number) => (
                  <Tag key={index} text={tag} />
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
