const {createFilePath} = require("gatsby-source-filesystem")
const path = require('path')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode, basePath: "content" })
    

    createNodeField({
      name: "slug",
      node,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx {
        nodes {
          id
          fields{
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  result.data.allMdx.nodes.forEach(node => {
    createPage({
      path: `/blog${node.fields.slug}`, // ✅ use custom slug
      component: `${path.resolve("./src/templates/BlogArticle.tsx")}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    })
  })
}