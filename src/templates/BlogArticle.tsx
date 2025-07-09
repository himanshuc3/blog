import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import Tag from '../components/tag';
import BaseComponent from '../containers/base';
import Comments from '../components/comments';
import BlogSidebar from '../components/BlogSidebar';
import './blogStyles.scss';
import { ThemeContext } from '../hooks/themeContext';
import InfoQuote from '../components/InfoQuote';

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

const components = {
  h1: (props: any) => (
    <h1 {...props} id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} />
  ),
  h2: (props: any) => (
    <h2 {...props} id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} />
  ),
  h3: (props: any) => (
    <h3 {...props} id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} />
  ),
  h4: (props: any) => (
    <h4 {...props} id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} />
  ),
  h5: (props: any) => (
    <h5 {...props} id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} />
  ),
  h6: (props: any) => (
    <h6 {...props} id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} />
  ),
  pre: (props: any) => {
    const codeChild = props.children?.props;
    const language = codeChild?.className?.replace('language-', '') || '';
    return (
      <div className="code-block-wrapper">
        {language && <div className="code-language">{language}</div>}
        <pre {...codeChild} />
      </div>
    );
  },
  code: (props: any) => {
    const isInline = !props.className;
    return isInline ? <code className="inline-code" {...props} /> : <code {...props} />;
  },
  a: (props: any) => (
    <a
      {...props}
      target={props.href.startsWith('http') ? '_blank' : undefined}
      rel={props.href.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
  img: (props: any) => (
    <div className="image-wrapper">
      <img {...props} alt={props.alt || ''} loading="lazy" />
      {props.alt && <figcaption>{props.alt}</figcaption>}
    </div>
  ),
  blockquote: (props: any) => <blockquote className="custom-blockquote" {...props} />,
  table: (props: any) => (
    <div className="table-wrapper">
      <table {...props} />
    </div>
  ),
  InfoQuote,
};

const BlogPostTemplate: React.FC<BlogPostProps> = ({ data, children }) => {
  const { mdx } = data;
  const { frontmatter, tableOfContents } = mdx;
  const { darkTheme } = useContext(ThemeContext);

  return (
    <BaseComponent className="blog-post-wrapper">
      <Helmet>
        <title>{frontmatter.title}</title>
        {frontmatter.seoDescription && (
          <meta name="description" content={frontmatter.seoDescription} />
        )}
      </Helmet>
      <div className="blog-content">
        <div className="blog-post">
          <div className="heading">
            <h1>{frontmatter.title}</h1>
            <div className="meta">
              <p className="sec-font">🗓️ {frontmatter.date}</p>
              <span className="separator">&middot;</span>
              <div className="tags">
                {frontmatter.tags.map((tag) => (
                  <Tag key={tag} text={tag} highlighted={false} />
                ))}
              </div>
            </div>
          </div>
          <div className="content sec-font">
            <MDXProvider components={components}>{children}</MDXProvider>
          </div>
          <Comments isDarkTheme={darkTheme} />
        </div>
        <BlogSidebar tableOfContents={tableOfContents} isDarkTheme={darkTheme} />
      </div>
    </BaseComponent>
  );
};

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
      tableOfContents
      body
    }
  }
`;

export default BlogPostTemplate;
