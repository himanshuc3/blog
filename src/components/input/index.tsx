import React, { ReactElement } from 'react'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import './styles.scss'
import { noop } from '../../utils/helpers';

interface Props {
    disabled?: boolean;
    placeholder?: string;
    onChange?: Function;
    icon?: ReactElement
    [key: string]: any;
}



const Input: React.FC<Props> = ({ disabled = false, placeholder = 'Enter text...', icon, onChange = noop, ...props }) => {

    return (
        <div className={`input ${disabled ? 'disabled' : ''}`}>
            {icon || <SearchOutlined style={{ color: "#777575", margin: '0 10px' }} />}
            <input type="email" placeholder={placeholder} disabled={disabled} onChange={(e) => onChange(e.target.value)} {...props} />
            <button disabled={disabled}><ArrowRightOutlined style={{ width: '10px' }} /></button>
        </div>
    )
}

export default Input