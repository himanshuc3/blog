import React from 'react'
import { Link } from 'gatsby'
import './styles.scss'
import Tag from '../tag';

interface Props {
    id: string;
    title: string;
    date: string;
    tags: string[];
    slug: string
}

const PostListing: React.FC<Props> = ({ title, date, tags, id, slug }) => {
    return (<Link className="post-heading" data-id={id} data-unique={id} to={`blog/${slug}`} >
        <div data-id={id} className='left'>
            <h1>{title}</h1>
            <div className="tags ibm-plex-mono" data-id={id}>
                {tags.map((tag) => (<Tag text={tag} />))}
            </div>

        </div>
        <div className="ibm-plex-mono meta right" data-id={id}>
            <span className="date" data-id={id}>
                {date}
            </span>
        </div>
    </Link >)
}

export default PostListing