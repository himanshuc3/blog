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
    const Posts = (data.allMarkdownRemark.edges).filter(edge => !!edge.node.frontmatter.date).map(edge => <PostListing key={edge.node.id} id={edge.node.id} {...edge.node.frontmatter} />)
    return (
        <div className='posts'>
            {Posts}
        </div>
    )
}


export default Posts