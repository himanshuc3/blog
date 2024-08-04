import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PostListing from '../postListing'
import './styles.scss'


const Posts = ({ posts }) => {
    const Posts = posts.map(post => <PostListing {...post} />)
    return (
        <div className='posts'>
            {Posts}
        </div>
    )
}


export default Posts