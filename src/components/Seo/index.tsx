import React from 'react';
import { useSiteMetadata } from '../../hooks/useSiteMetaData';
import { Helmet } from 'react-helmet';

interface ISEOMetaData {
  title?: string;
  description?: string;
  pathname?: string;
  keywords?: string[];
  children?: React.ReactNode;
}

export const SEO = ({ title, description, pathname, children, keywords }: ISEOMetaData) => {
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

  return (
    <Helmet
      title={title}
      meta={[
        {
          name: `description`,
          content: seo.description,
        },
        {
          name: `keywords`,
          content: seo.keywords,
        },
        {
          property: `og:title`,
          content: seo.title,
        },
        {
          property: `og:description`,
          content: seo.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: seo.image,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:image`,
          content: image,
        },
        {
          name: `twitter:creator`,
          content: 'Himanshu',
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: seo.description,
        },
      ]}
    >
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />
      {children}
    </Helmet>
  );
};
