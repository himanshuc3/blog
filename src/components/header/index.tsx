import * as React from 'react'
import { Link } from 'gatsby'
import { SunOutlined } from '@ant-design/icons'
import Logo from '../logo'
import './styles.scss'

const Header: React.FC<{}> = () => {
    return (
        <nav className='navbar'>
            <Logo />
            <div className='menu'>
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                <SunOutlined />
                <div className='search'></div>
            </div>
        </nav>
    )
}

export default Header