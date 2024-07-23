import React from 'react'
import { FrownOutlined, ArrowRightOutlined } from '@ant-design/icons'
import './styles.scss'


const Input = () => {
    return (
        <div className='input'>
            <FrownOutlined style={{ color: "#777575", margin: '0 10px' }} />
            <input type="email" placeholder='Enter email...' />
            <button><ArrowRightOutlined style={{ width: '10px' }} /></button>
        </div>
    )
}

export default Input