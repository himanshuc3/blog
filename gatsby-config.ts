import type { GatsbyConfig } from "gatsby";

const dir = __dirname;

const config: GatsbyConfig = {
  siteMetadata: {
    title: `blog`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  // TODO: No global variables as of now
  graphqlTypegen: true,
  plugins: [
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
        gatsbyRemarkPllugins: [{
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
    },]
};

export default config;
