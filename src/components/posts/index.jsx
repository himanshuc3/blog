import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PostListing from '../postListing'
import './styles.scss'


const Posts = () => {
    const data = useStaticQuery(graphql`
        
    query{
        allMarkdownRemark(sort:{frontmatter: {date: DESC}}){
        edges{
            node{
                id
                frontmatter{
                    date(formatString: "MMMM DD, YYYY")
                    slug
                    title
                    tags
                }
            }
            }
        
        }
    }
        
        `)
    // const { allMarkdownRemark: { edges } } = data
    // console.log(data.allMarkdownRemark)
    const Posts = (data.allMarkdownRemark.edges).filter(edge => !!edge.node.frontmatter.date).map(edge => <PostListing key={edge.node.id} id={edge.node.id} {...edge.node.frontmatter} />)
    // console.log(posts)
    return (
        <div className='posts'>
            {Posts}
        </div>
    )
}

// export const pageQuery = graphql`
//     query{
//         allMarkdownRemark(sort:{frontmatter: {date: DESC}}){
//         edges{
//             node{
//                 id
//                 frontmatter{
//                     date(formatString: "MMMM DD, YYYY")
//                     slug
//                     title
//                 }
//             }
//             }

//         }
//     }


// `

export default Posts