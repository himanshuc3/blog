import React from 'react';
import { useSiteMetadata } from '../../hooks/useSiteMetaData';
import { Helmet } from 'react-helmet';

interface ISEOMetaData {
  title?: string;
  description?: string;
  pathname?: string;
  keywords?: string[];
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
  article,
}: ISEOMetaData) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    twitterUsername,
    keywords: defaultKeywords,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
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

  return (
    <Helmet
      title={pageTitle}
      htmlAttributes={{
        lang: 'en',
      }}
      meta={[
        {
          name: `description`,
          content: seo.description,
        },
        {
          name: `keywords`,
          content: Array.isArray(seo.keywords) ? seo.keywords.join(', ') : seo.keywords,
        },
        {
          name: `robots`,
          content: `index, follow`,
        },
        {
          name: `viewport`,
          content: `width=device-width, initial-scale=1.0`,
        },
        {
          name: `author`,
          content: `Himanshu Chhabra`,
        },
        // Open Graph tags
        {
          property: `og:title`,
          content: pageTitle,
        },
        {
          property: `og:description`,
          content: seo.description,
        },
        {
          property: `og:type`,
          content: article ? `article` : `website`,
        },
        {
          property: `og:url`,
          content: seo.url,
        },
        {
          property: `og:image`,
          content: seo.image,
        },
        {
          property: `og:site_name`,
          content: defaultTitle,
        },
        // Article specific Open Graph tags
        ...(article
          ? [
              {
                property: `article:published_time`,
                content: article.publishedTime,
              },
              {
                property: `article:modified_time`,
                content: article.modifiedTime || article.publishedTime,
              },
              {
                property: `article:author`,
                content: article.author || 'Himanshu Chhabra',
              },
              ...(article.tags || []).map((tag) => ({
                property: `article:tag`,
                content: tag,
              })),
            ]
          : []),
        // Twitter Card tags
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: seo.image,
        },
        {
          name: `twitter:creator`,
          content: twitterUsername,
        },
        {
          name: `twitter:title`,
          content: pageTitle,
        },
        {
          name: `twitter:description`,
          content: seo.description,
        },
      ]}
      link={[
        {
          rel: 'canonical',
          href: seo.url,
        },
      ]}
    >
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
      {children}
    </Helmet>
  );
};
