import React, {useContext} from 'react'
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet"
import Tag from '../../components/tag'
import BaseComponent from '../../containers/base'
import Comments from '../../components/comments'
import './blogStyles.scss'
import ThemeContext from '../../hooks/themeContext'


export default function BlogPostTemplate({
    data
}) {
    const { markdownRemark } = data // data.markdownRemark holds my post data
    const { frontmatter, html } = markdownRemark
    const { darkTheme } = useContext(ThemeContext);

    return (
        <BaseComponent className='blog-post-wrapper'>
            <Helmet title={`${frontmatter.title}`} />
            <div className='blog-post'>
                <div className='heading'>
                    <h1>{frontmatter.title}</h1>
                    <div className='meta'>
                        <p className='sec-font'>🗓️ {frontmatter.date}</p>
                        <span className='separator'>&middot;</span>
                        <div className='tags'>
                            {frontmatter.tags.map(tag => <Tag text={tag} />)}
                        </div>
                    </div>
                </div>
                <div className="content sec-font" dangerouslySetInnerHTML={{ __html: html }} />
                {/* <Divider darkTheme={darkTheme} />
                <div style={{ marginBottom: '20px' }}></div> */}
                <Comments  isDarkTheme={darkTheme}/>
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