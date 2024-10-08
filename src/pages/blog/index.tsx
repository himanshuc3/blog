import Skeleton from '../../components/skeleton'
import React, { useState } from 'react'
import type { HeadFC, PageProps } from "gatsby"
import PostListing from '../../components/postListing'
import Tag from '../../components/tag'
import { IPost } from '../../utils/types'
import Posts from '../../components/posts'
import Input from '../../components/input'
import NoPostsImage from '../../images/cena.png'


import './styles.scss'
import usePostsData from '../../hooks/usePostsData'
import BaseComponent from '../../containers/base'


const TAGS = [
    'personal'
]


function debug(prop: any) {
    console.log(prop)
    return true
}


function getSortedPosts(posts: IPost[]) {

    let postsByYear: { [key: number]: IPost[] } = posts.reduce((acc: { [key: number]: IPost[] }, curr) => {
        const currYear: number = curr.date.getFullYear()
        if (acc[currYear]) {
            acc[currYear].push(curr)
        } else {
            acc[currYear] = [curr]
        }
        return acc
    }, {})

    // NOTE: Object.keys serializes ig, always returns strings for keys
    return Object.keys(postsByYear).sort((y1, y2) => (+y1) - (+y2)).map((year): [number, IPost[]] => ([+year, postsByYear[+year]]))

}

function filterPostsByTag(postsByYear: Array<[number, IPost[]]>, tag: string) {
    return postsByYear.map(([year, posts]) => {

        const filteredPosts: IPost[] = posts.filter(post => post.tags.includes(tag))
        return [year, filteredPosts]
    }).filter(([_, posts]) => Array.isArray(posts) && posts.length)
}

const BlogPage: React.FC<PageProps> = () => {
    const [selectedTag, setSelectedTag] = useState<null | string>(null)
    const [searchText, setSearchText] = useState<string>('')
    let postsData: IPost[] = usePostsData()

    let sortedPosts = getSortedPosts(postsData)
    const [filteredPosts, setFilteredPosts] = useState(sortedPosts)

    function onTagSelect(e: React.SyntheticEvent<HTMLDivElement>) {
        // TODO: Bad code, relying on implementation detail
        if (!(e.target instanceof HTMLSpanElement)) return
        setSearchText('')

        const tag = e.target.dataset.tag
        console.log({ tag })
        if (typeof tag != 'string') throw new Error('Tag not a string')
        if (tag == selectedTag) {
            setSelectedTag(null)
            setFilteredPosts(sortedPosts)
        } else {
            setSelectedTag(tag)
            setFilteredPosts(filterPostsByTag(sortedPosts, tag))
        }
    }

    function onSearchInput(search: string) {
        setSearchText(search)
        if (search === "") setFilteredPosts(sortedPosts)

        setSelectedTag(null)

        const lowercaseSearch = search.toLowerCase()
        setFilteredPosts(sortedPosts.map(([key, posts]): [number, IPost[]] => {
            return [key, posts.filter(post => post.title.toLowerCase().indexOf(lowercaseSearch) != -1)]
        }).filter(([_, posts]) => posts.length > 0))
    }

    return (
        <BaseComponent className='blog-wrapper'>
            <div className="poster section">
                <div className='heading'>
                    <h1>Articles</h1>
                    <p className='ibm-plex-mono'>Feel free to pick and destroy the writings, one at a time.</p>

                </div>
                <div className='filter'>
                    <div>
                        <Input onChange={onSearchInput} value={searchText} />
                        <div className='tags' onClick={onTagSelect}>
                            {TAGS.map(tag => <Tag text={tag} highlighted={selectedTag === tag} />)}
                        </div>
                    </div>
                </div>
                {filteredPosts.length == 0 ?
                    (<div className='no-posts'>
                        <img src={NoPostsImage} alt="no posts available" />
                    </div>) :
                    (

                        filteredPosts.map(([year, posts]) => {
                            return <div>
                                <div className='filters'>
                                    <h1 className='ibm-plex-mono'>{year}</h1>
                                </div>

                                <div className="posts">
                                    <Posts posts={posts} />
                                </div>

                            </div>
                        })
                    )
                }
            </div>
        </BaseComponent>
    )
}


export default BlogPage

export const Head: HeadFC = () =>
    <>
        <title>Himanshu's blog.</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
        <meta name="description" content="Himanshu Chhabra's blog/portfolio" />
    </>
