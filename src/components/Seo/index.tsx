import React from 'react';
import { useSiteMetadata } from '../../hooks/useSiteMetaData';
import FontPreload from './FontPreload';

interface ISEOMetaData {
  title?: string;
  description?: string;
  pathname?: string;
  keywords?: string[];
  /** Ask search engines not to index the page (the 404). */
  noindex?: boolean;
  children?: React.ReactNode;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

export const SEO = ({
  title,
  description,
  pathname,
  children,
  keywords,
  noindex = false,
  article,
}: ISEOMetaData) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    twitterUserName,
    keywords: defaultKeywords,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    keywords: keywords || defaultKeywords,
  };

  // Ensure title is always a string to prevent hydration issues
  const pageTitle = seo.title || "Himanshu's humble abode";

  // Structured Data for Website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Himanshu Chhabra',
      url: siteUrl,
      sameAs: [
        'https://twitter.com/_himanshuc3',
        'https://github.com/himanshuc3',
        'https://linkedin.com/in/himanshu-chhabra-96b339162',
      ],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Person Schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Himanshu Chhabra',
    jobTitle: 'Fullstack Developer',
    description:
      'Fullstack engineer with expertise in JavaScript, Golang, and computational geometry',
    url: siteUrl,
    image: `${siteUrl}/images/dp.webp`,
    sameAs: [
      'https://twitter.com/_himanshuc3',
      'https://github.com/himanshuc3',
      'https://linkedin.com/in/himanshu-chhabra-96b339162',
    ],
    knowsAbout: ['JavaScript', 'Golang', 'React', 'Web Development', 'Computational Geometry'],
    worksFor: {
      '@type': 'Organization',
      name: 'Quillbot',
    },
  };

  // Article Schema (for blog posts)
  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: pageTitle,
        description: seo.description,
        image: seo.image,
        url: seo.url,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime || article.publishedTime,
        author: {
          '@type': 'Person',
          name: article.author || 'Himanshu Chhabra',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Person',
          name: 'Himanshu Chhabra',
          url: siteUrl,
        },
        keywords: article.tags?.join(', '),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': seo.url,
        },
      }
    : null;

  const keywordList = Array.isArray(seo.keywords) ? seo.keywords.join(', ') : seo.keywords;
  const publishedTime = article?.publishedTime;
  const modifiedTime = article?.modifiedTime || publishedTime;
  // JSON-LD goes in as raw text (React would escape the quotes); `<` is escaped so it can't end the tag.
  const jsonLd = (schema: object) => ({ __html: JSON.stringify(schema).replace(/</g, '\\u003c') });

  // Rendered from each page's `Head` export (Gatsby's Head API), which accepts plain head elements.
  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={keywordList} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <meta name="author" content="Himanshu Chhabra" />
      <link rel="canonical" href={seo.url} />
      <FontPreload />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={defaultTitle} />
      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {article && <meta property="article:author" content={article.author || 'Himanshu Chhabra'} />}
      {article?.tags?.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={seo.image} />
      {twitterUserName && <meta name="twitter:creator" content={twitterUserName} />}
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={seo.description} />

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(personSchema)} />
      {articleSchema && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />}
      {children}
    </>
  );
};
