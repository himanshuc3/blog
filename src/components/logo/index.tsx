import * as React from 'react'
import './styles.scss'

const Logo: React.FC<{}> = () => {
    return <div className='logo'>
        <div className='emojis'>
            <div>♞</div>
            <div>🏓</div>
            <div>🧑‍💻</div>
        </div>
        {/* <h1>HC</h1> */}
    </div>
}

export default Logo