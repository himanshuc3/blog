import React from 'react'
import './styles.scss'

interface Props {
    id: string;
    title: string;
    date: string;
    tags: string[]
}

const PostListing: React.FC<Props> = ({ title, date, tags, id }) => {
    return (<div className="post-heading" data-id={id} data-unique={id}>
        <h1 data-id={id}>{title}</h1>
        <div className="ibm-plex-mono meta" data-id={id}>
            <span className="date" data-id={id}>
                {date}
            </span>
            {/* <div className="tags" data-id={id}>
                {tags.map((tag) => (<span data-id={id}>{tag}</span>))}
            </div> */}
        </div>
    </div>)
}

export default PostListing