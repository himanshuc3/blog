import React from 'react'
import './styles.scss'

type Props = {
    text: string;
}

const Tag: React.FC<Props> = ({ text }) => {
    return (
        <span className='tag'>{text}</span>
    )
}

export default Tag