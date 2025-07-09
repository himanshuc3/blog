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
           {
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allMdx(sort: { frontmatter: { date: DESC } }){
                nodes {
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
    `;
}

const config = {
  siteMetadata: {
    title: `Himanshu's bin`,
    description:
      'Himanshu Chhabra a fullstack engineer with a curiousity to debate and rant on topics like javascript, golang, computational geometry and tooling with a sprinkle of liberal views.',
    twitterUserName: '@_himanshuc3',
    siteUrl: `https://himanshusb.in`,
    image: './src/images/logo.png',
    keywords: ['javascript', 'golang', 'web development', 'fullstack', 'computational geometry', 'tooling'],
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  // TODO: No global variables as of now
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx'],
        mdxOptions: {
          
        },
        gatsbyRemarkPlugins: [
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-images',
            options:{
              backgroundColor: 'transparent'
            }
          },
          {
            resolve: 'gatsby-remark-footnotes',
            options: {
              footnoteBackRefPreviousElementDisplay: 'inline',
              footnoteBackRefDisplay: 'inline',
              useCustomDivider: "<h2 class='reference-header'>🔖 Footnotes</h2>",
            },
          },
        ],
      },
    },
    'gatsby-plugin-webpack-bundle-analyser-v2',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `@stackql/gatsby-plugin-smartlook`,
      options: {
        projectKey: '48a7fc18cbf83fe54cc6e79475bf407e162a097a',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${dir}/src/content`,
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
            file: 'https://fonts.googleapis.com/css2?family=Sanchez:ital@0;1&display=swap',
          },
          {
            name: 'Secondary Font',
            file: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',
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
