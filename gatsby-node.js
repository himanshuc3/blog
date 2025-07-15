const {createFilePath} = require("gatsby-source-filesystem")
const path = require('path')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode, basePath: "content" })
    console.log('Creating slug for MDX node:', slug)

    createNodeField({
      name: "slug",
      node,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { slug: { ne: null } } }) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
          frontmatter {
            slug
            title
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while building pages:`, result.errors)
    return
  }

  const posts = result.data.allMdx.nodes

  if (!posts.length) {
    reporter.warn(`No MDX posts found!`)
    return
  }

  posts.forEach((post) => {
    const slug = post.fields?.slug || post.frontmatter?.slug
    if (!slug) {
      reporter.warn(`No slug found for post: ${post.frontmatter?.title || post.id}`)
      return
    }

    console.log(`Creating page for: ${slug}`)
    
    createPage({
      path: `/blog${slug}`,
      component: `${path.resolve("./src/templates/BlogArticle.tsx")}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        id: post.id,
        slug: slug,
      },
    })
  })

  reporter.info(`Created ${posts.length} blog pages`)
}

// Ensure MDX nodes are properly processed
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      fields: MdxFields
    }

    type MdxFrontmatter {
      title: String
      date: Date @dateformat
      slug: String
      tags: [String]
      seoDescription: String
    }

    type MdxFields {
      slug: String
    }
  `)
}