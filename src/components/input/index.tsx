import React, { ReactElement } from 'react';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import './styles.scss';
import { noop } from '../../utils/helpers';

interface Props {
  disabled?: boolean;
  placeholder?: string;
  onChange?: Function;
  icon?: ReactElement;
  [key: string]: any;
}

const Input: React.FC<Props> = ({
  disabled = false,
  placeholder = 'Enter text...',
  icon,
  onChange = noop,
  className,
  buttonText,
  ...props
}) => {
  return (
    <div className={`input ${disabled ? 'disabled' : ''} ${className}`}>
      {icon || <SearchOutlined style={{ color: '#777575', margin: '0 10px' }} />}
      <input
        required
        type="email"
        placeholder={placeholder}
        name="email"
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <button disabled={disabled} className="submit-btn w-b">
        {buttonText || 'subscribe'}
        {/* <ArrowRightOutlined style={{ width: '10px', marginLeft: '5px' }} /> */}
      </button>
    </div>
  );
};

export default Input;
