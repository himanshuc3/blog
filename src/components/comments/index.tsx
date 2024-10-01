import React from 'react'

interface Props {
    commentBox: React.Ref<HTMLDivElement>
}

const Comment: React.FC<Props> = ({ commentBox }) => (<div ref={commentBox} id="comments"></div>)

export default Comment