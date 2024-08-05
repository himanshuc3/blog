import * as React from 'react'
import { LinkOutlined } from '@ant-design/icons'
import Subscribe from '../subscribe'

import Resume from '../../media/Himanshu_Resume.pdf'
import './styles.scss'
import Socials from '../socials'


const Footer: React.FC<{}> = () => {
    return <div id='footer'>
        <div>
            <Subscribe />
            <div className='bottom'>
                <a href={Resume} target='_blank'><p>Resume <LinkOutlined /></p></a>
                <Socials />
            </div>

        </div>
    </div>
}

export default Footer