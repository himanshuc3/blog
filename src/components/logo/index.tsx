import * as React from 'react'
import logo from '../../images/logo2.png'
import './styles.scss'

const Logo: React.FC<{}> = () => {
    return <div className='logo'>
        <div className='emojis-container'>


            <div className='emojis'>
                <div>🏎️</div>
                <div>🎮</div>
                <div>📚</div>
                <div id="logo_img"><img src={logo} alt="blog logo" /></div>
            </div>
        </div>
        <div className='backshadow'></div>
        <div className='backshadow'></div>
    </div>
}

export default Logo