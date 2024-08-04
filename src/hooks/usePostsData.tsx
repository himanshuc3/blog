import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'

interface IEdge {
    node: {
        id: string;
        frontmatter: {
            date: null | string;
            slug: string;
            title: string;
            tags: string[]
        }
    }
}


function usePostsData() {
    const { allMarkdownRemark: { edges } } = useStaticQuery(graphql`
        
    query{
        allMarkdownRemark(sort:{frontmatter: {date: DESC}}){
        edges{
            node{
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
    }
        
        `)

    return edges.filter((edge: IEdge) => !!edge.node.frontmatter.date).map((edge: IEdge) => ({ id: edge.node.id, ...edge.node.frontmatter, date: new Date(edge.node.frontmatter.date) }))
}

export default usePostsData