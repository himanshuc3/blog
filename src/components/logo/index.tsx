import * as React from 'react'
import logo from '../../images/logo.png'
import './styles.scss'
import { Link } from 'gatsby'

const Logo: React.FC<{}> = () => {
    return <Link to='/'>

        <div className='logo'>
            {/* <div className='emojis-container'>


            <div className='emojis'>
                <div>🏎️</div>
                <div>🎮</div>
                <div>📚</div>
                <div id="logo_img"><img src={logo} alt="blog logo" /></div>
            </div>
        </div>
        <div className='backshadow'></div>
        <div className='backshadow'></div> */}
            <div id="alternate_logo_img"><img src={logo} alt="blog logo" /></div>
        </div>
    </Link >
}

export default Logo