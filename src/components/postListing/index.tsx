import React from 'react'

interface Props {
    title: string;
    date: string;
    tags: string[]
}

const PostListing: React.FC<Props> = ({ title, date, tags }) => {
    return (<div className="post-heading">
        <h1>{title}</h1>
        <div className="ibm-plex-mono meta">
            <span className="date">
                {date}
            </span>
            <div className="tags">
                {tags.map((tag) => (<span className='chunky-underline'>{tag}</span>))}
            </div>
        </div>
    </div>)
}

export default PostListing