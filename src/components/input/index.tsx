import React, { ReactElement } from 'react';
import { FaSearch } from 'react-icons/fa';

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
      <div className="input-text">
        {icon || <FaSearch style={{ color: '#777575', margin: '0 10px' }} />}
        <input
          required
          type="email"
          placeholder={placeholder}
          name="email"
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="sec-font"
          {...props}
        />
      </div>
      <button disabled={disabled} className="submit-btn w-b sec-font">
        {buttonText || 'subscribe'}
      </button>
    </div>
  );
};

export default Input;
