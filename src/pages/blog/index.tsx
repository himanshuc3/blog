import Skeleton from '../../components/skeleton'
import React from 'react'
import type { HeadFC, PageProps } from "gatsby"
import PostListing from '../../components/postListing'
import Tag from '../../components/tag'
import Input from '../../components/input'


import './styles.scss'

const RECENT_POSTS = [
    {
        title: '🖼️ Everyone gets picture-in-picture mode',
        date: `29 Sept 2024`,
        tags: ['javascript', 'column']
    },
    {
        title: '🖌️ Physics based gaming in p5.js',
        date: `12 Oct 2023`,
        tags: ['p5.js', 'canvas']
    },

]

const TAGS = [
    'javascript',
    'column',
    'p5.js',
    'bash',
    'node.js',
    'svelte'
]

const BlogPage: React.FC<PageProps> = () => {
    return (
        <Skeleton className='blog-wrapper'>
            <div className="poster section">
                <div className='heading'>
                    <h1>Articles</h1>
                    <p className='ibm-plex-mono'>Feel free to pick and destroy the writings, one at a time.</p>

                </div>
                <div className='filter'>
                    <div>
                        <Input />
                        <div className='tags'>
                            {TAGS.map(tag => <Tag text={tag} />)}
                        </div>
                    </div>
                </div>
                <div className='filters'>
                    <h1 className='ibm-plex-mono'>2024</h1>
                </div>
                <div className="posts">
                    {
                        RECENT_POSTS.map(post => <PostListing {...post} />)
                    }
                </div>
            </div>
        </Skeleton>
    )
}


export default BlogPage
export const Head: HeadFC = () => <title>Home Page</title>
