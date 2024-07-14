import * as React from 'react'
import { LinkOutlined } from '@ant-design/icons'
import Subscribe from '../subscribe'

import './styles.scss'
import Socials from '../socials'


const Footer: React.FC<{}> = () => {
    return <div id='footer'>
        <Subscribe />
        <div className='bottom'>
            <div>Resume <LinkOutlined /></div>
            <Socials />

        </div>
    </div>
}

export default Footer