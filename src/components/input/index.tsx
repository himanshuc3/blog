import React from 'react'
import { FrownOutlined, ArrowRightOutlined } from '@ant-design/icons'
import './styles.scss'
import { noop } from '../../utils/helpers';

interface Props {
    disabled?: boolean;
    placeholder?: string;
    onChange?: Function;
    [key: string]: any;
}



const Input: React.FC<Props> = ({ disabled = false, placeholder = 'Enter text...', onChange = noop, ...props }) => {

    return (
        <div className={`input ${disabled ? 'disabled' : ''}`}>
            <FrownOutlined style={{ color: "#777575", margin: '0 10px' }} />
            <input type="email" placeholder={placeholder} disabled={disabled} onChange={(e) => onChange(e.target.value)} {...props} />
            <button disabled={disabled}><ArrowRightOutlined style={{ width: '10px' }} /></button>
        </div>
    )
}

export default Input