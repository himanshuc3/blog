const dir = __dirname;

interface INode {
  id: string;
  frontmatter: {
    slug: string;
    title: string;
    tags: string[];
    date: string;
  }
}

interface IMarkdownRemark {
  nodes: INode[]
}

interface ISerializeParams {
  query: {
    site: {
      siteMetadata: {
        siteUrl: string;
      }
    };
    allMarkdownRemark: {
      nodes: INode[]
    }
  }
}



function serializePostsForRss({ query: { site, allMarkdownRemark } }: ISerializeParams) {

  return allMarkdownRemark.nodes.map((node: INode) => {
    return Object.assign({}, node.frontmatter, {
      slug: node.frontmatter.slug,
      title: node.frontmatter.title,
      tags: node.frontmatter.tags,
      date: node.frontmatter.date,
      id: node.id,
      url: site.siteMetadata.siteUrl + '/blog/' + node.frontmatter.slug
    })
  })
}

function getMarkdownPosts() {
  return `
           {   allMarkdownRemark(sort: { frontmatter: { date: DESC } }){
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
    `
}

const config = {
  siteMetadata: {
    title: `Himanshu's bin`,
    description: "Should frontend development be given the title of an SDE? Let's discuss about it.",
    siteUrl: `https://himanshusb.in`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  // TODO: No global variables as of now
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-webpack-bundle-analyser-v2",
    'gatsby-plugin-bundle-stats',
    {
      resolve: 'gatsby-plugin-plausible',
      options: {
        domain: 'himanshusb.in'
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem', options: {
        name: 'content',
        path: `${dir}/src/content`
      }
    }, {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-images',
          // 'gatsby-remark-lazy-load',
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-footnotes',
            options: {
              useCustomDivider: "<hr/><strong>Refernces:</strong>"
            }
          }
        ]
      }
    }, "gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    }, {
      resolve: "gatsby-plugin-mdx", options: {
        gatsbyRemarkPlugins: [{
          resolve: 'gatsby-remark-images'
        }]
      }
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    }, {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Rubik`,
            file: `https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap`,
          }, {
            name: `IBM Plex Mono`,
            file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap`,
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
            query: getMarkdownPosts()
          },

        ]
      }
    }
  ]
};

export default config;
