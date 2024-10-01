import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet"
import Tag from '../../components/tag'
import BaseComponent from '../../containers/base'
import Comments from '../../components/comments'
import './blogStyles.scss'

export default function BlogPostTemplate({
    data
}) {
    const { markdownRemark } = data // data.markdownRemark holds my post data
    const { frontmatter, html } = markdownRemark
    const commentBox = React.createRef()

    // React.useEffect(() => {
    //     const scriptEl = document.createElement('script')
    //     scriptEl.async = true
    //     scriptEl.src = 'https://utteranc.es/client.js'
    //     scriptEl.setAttribute('repo', 'himanshuc3/blog')
    //     scriptEl.setAttribute('issue-term', 'title')
    //     scriptEl.setAttribute('id', 'utterances')
    //     scriptEl.setAttribute('theme', 'icy-dark')
    //     scriptEl.setAttribute('crossorigin', 'anonymous')
    //     console.log(commentBox?.current)
    //     if (commentBox && commentBox.current) {
    //         commentBox.current.appendChild(scriptEl)
    //     } else {
    //         console.log(`Error adding utterances comments on: ${commentBox}`)
    //     }
    // }, [])

    return (
        <BaseComponent className='blog-post-wrapper'>
            <Helmet title={`${frontmatter.title}`} />
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
                <Comments commentBox={commentBox} />
            </div>
        </BaseComponent>
    )
}

export const Head = () =>
    <>
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