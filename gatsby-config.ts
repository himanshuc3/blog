const remarkGfm = require('remark-gfm').default

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const dir = __dirname;

interface INode {
  id: string;
  frontmatter: {
    slug: string;
    title: string;
    tags: string[];
    date: string;
  };
}

interface ISerializeParams {
  query: {
    site: {
      siteMetadata: {
        siteUrl: string;
      };
    };
    allMdx: {
      nodes: INode[];
    };
  };
}

function serializePostsForRss({ query: { site, allMdx } }: ISerializeParams) {
  return allMdx.nodes.map((node: INode) => {
    return Object.assign({}, node.frontmatter, {
      slug: node.frontmatter.slug,
      title: node.frontmatter.title,
      tags: node.frontmatter.tags,
      date: node.frontmatter.date,
      id: node.id,
      url: site.siteMetadata.siteUrl + '/blog/' + node.frontmatter.slug,
    });
  });
}

function getMarkdownPosts() {
  return `
           {   allMdx(sort: { frontmatter: { date: DESC } }){
                        nodes{
                          id
                          frontmatter{
                            date
                            slug
                            title
                            tags
                          }
                        }

              }
            }
    `;
}

const config = {
  siteMetadata: {
    title: "Himanshu's humble abode",
    description:
      'Welcome to my webspace. I am a fullstack engineer with a curiousity to debate and rant on topics like javascript, golang, computational geometry and tooling with a sprinkle of liberal views.',
    twitterUserName: '@_himanshuc3',
    siteUrl: `https://himanshusb.in`,
    image: './src/images/logo.png',
    keywords: ['computer science', 'javascript', 'golang', 'computational geometry', 'blog'],
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  // TODO: No global variables as of now
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-smartlook`,
      options: {
        projectKey: '48a7fc18cbf83fe54cc6e79475bf407e162a097a',
      },
    },
    'gatsby-plugin-webpack-bundle-analyser-v2',
    {
      resolve: 'gatsby-plugin-plausible',
      options: {
        domain: 'himanshusb.in',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx'],
        mdxOptions:{
          remarkPlugins: [remarkGfm],
        },
        gatsbyRemarkPlugins: [
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: 'transparent',
            },
          },
          `gatsby-transformer-remark`,
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${dir}/src/content`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: 'transparent',
            },
          },
        ],
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/404/', '/404.html'],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://himanshusb.in',
        sitemap: 'https://himanshusb.in/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    // Performance & Core Web Vitals optimization
    {
      resolve: 'gatsby-plugin-preload-fonts',
      options: {
        crossOrigin: 'anonymous',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/blog/*', '/about/', '/'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: `@nathanpate/gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        mode: 'async',
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: 'Primary Font',
            file: 'https://fonts.googleapis.com/css2?family=Mozilla+Headline:wght@200..700&display=swap',
          },
          {
            name: 'Secondary Font',
            file: 'https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap',
          },
          
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            output: '/rss.xml',
            title: "Himanshu's bin",
            serialize: serializePostsForRss,
            query: getMarkdownPosts(),
          },
        ],
      },
    },
  ],
};

export default config;
