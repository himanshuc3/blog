import * as React from 'react'
import { LinkOutlined } from '@ant-design/icons'
import Subscribe from '../subscribe'




const Footer: React.FC<{}> = () => {
    return <div>
        <Subscribe />
        <div>
            <div>Resume <LinkOutlined /></div>
            <div>Socials icons</div>

        </div>
    </div>
}

export default Footer