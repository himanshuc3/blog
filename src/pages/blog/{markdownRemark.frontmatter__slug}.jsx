import React, {useContext} from 'react'
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet"
import Tag from '../../components/tag'
import { SEO } from '../../components/Seo'
import BaseComponent from '../../containers/base'
import Comments from '../../components/comments'
import './blogStyles.scss'
import ThemeContext from '../../hooks/themeContext'
import { DATE_OPTS } from '../../utils/constants'

require('prismjs/themes/prism-solarizedlight.css');
require('prismjs/plugins/line-numbers/prism-line-numbers.css');


export default function BlogPostTemplate({
    data
}) {
    const { markdownRemark } = data // data.markdownRemark holds my post data
    const { frontmatter, html } = markdownRemark
    const { darkTheme } = useContext(ThemeContext);

    

    return (
        <BaseComponent className='blog-post-wrapper' isScrollLoader={true}>
            <SEO title={frontmatter.title} description={frontmatter.seoDescription} keywords={frontmatter.tags} />
            <div className='blog-post'>
                <div className='heading'>
                    <h1 className='sec-font'>{frontmatter.title}</h1>
                    <div className='meta'>
                        <p className='sec-font'>Written on {(new Date(frontmatter.date)).toLocaleDateString('en-US', DATE_OPTS)}</p>
                        <span className='separator'>&middot;</span>
                        <div className='tags'>
                            {frontmatter.tags.map(tag => <Tag text={tag} />)}
                        </div>
                    </div>
                </div>
                <div className="content sec-font" dangerouslySetInnerHTML={{ __html: html }} />
                <Comments isDarkTheme={darkTheme}/>
            </div>
        </BaseComponent>
    )
}

export const pageQuery = graphql`
    query($id: String!){
        markdownRemark(id:{eq: $id}){
            html
            frontmatter{
                date(formatString: "MMMM DD, YYYY")
                slug
                title,
                tags,
                seoDescription
            }
        }
    
    }
`