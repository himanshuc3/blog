import * as React from 'react'
import { graphql } from 'gatsby'
import Tag from '../../components/tag'
import BaseComponent from '../../containers/base'
import './blogStyles.scss'

export default function BlogPostTemplate({
    data
}) {
    const { markdownRemark } = data // data.markdownRemark holds my post data
    const { frontmatter, html } = markdownRemark

    return (
        <BaseComponent className='blog-post-wrapper'>
            <div className='blog-post'>
                <div className='heading'>
                    <h1>{frontmatter.title}</h1>
                    <div className='meta'>
                        <p className='ibm-plex-mono'>🗓️ {frontmatter.date}</p>
                        <span className='separator'>&middot;</span>
                        <div className='tags'>
                            {frontmatter.tags.map(tag => <Tag text={tag} />)}
                        </div>
                    </div>
                </div>
                <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </BaseComponent>
    )
}

export const Head = () =>
    <>
        <title>Blog | Himanshu</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
        <meta name="description" content="Himanshu Chhabra's blog/portfolio" />
    </>

export const pageQuery = graphql`
    query($id: String!){
        markdownRemark(id:{eq: $id}){
            html
            frontmatter{
                date(formatString: "MMMM DD, YYYY")
                slug
                title,
                tags,
            }
        }
    
    }
`