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
      'Himanshu Chhabra is a fullstack engineer with a curiousity to debate and rant on topics like javascript, golang, computational geometry and tooling with a sprinkle of liberal views.',
    twitterUserName: '@_himanshuc3',
    siteUrl: `https://himanshusb.in`,
    image: './src/images/logo.png',
    keywords: ['javascript', 'golang', 'web development', 'fullstack', 'computational geometry', 'tooling'],
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        mdxOptions: {
          remarkPlugins: [
            require('remark-gfm'),
          ],
        },
        gatsbyRemarkPlugins: [
          'gatsby-remark-images',
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-footnotes',
            options: {
              footnoteBackRefPreviousElementDisplay: 'inline',
              footnoteBackRefDisplay: 'inline',
              useCustomDivider: "<h2 class='reference-header'>🔖 Footnotes</h2>",
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'codeblock-',
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: '@nathanpate/gatsby-omni-font-loader',
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: 'Primary Font',
            file: 'https://fonts.googleapis.com/css2?family=Petrona:ital,wght@0,100..900;1,100..900&display=swap',
          },
          {
            name: 'Secondary Font',
            file: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',
          },
        ],
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${dir}/src/content`,
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
