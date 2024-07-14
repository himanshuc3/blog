import * as React from 'react'
import { Link } from 'gatsby'
import { SunOutlined } from '@ant-design/icons'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import Logo from '../logo'
import './styles.scss'
interface Props {
    [key: string]: any;
}

const Header: React.FC<Props> = ({ onToggleTheme, darkTheme }) => {
    return (
        <nav className='navbar'>
            <Logo />
            <div className='menu'>
                <Link to="/about" className='link'>About</Link>
                <Link to="/blog" className='link'>Blog</Link>
                <div>
                    <DarkModeSwitch style={{ display: 'inline-block' }} checked={!darkTheme} sunColor='#f7e018' moonColor='black' onChange={onToggleTheme} size={20} />
                </div>
                <div className='search'></div>
            </div>
        </nav>
    )
}

export default Header