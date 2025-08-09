import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './styles.scss';

interface Props {
  disabled?: boolean;
  placeholder?: string;
  onChange?: Function;
  className?: string;
  buttonText?: string;
}

function noop() {}

export default function Search({
  disabled = false,
  placeholder = 'Enter text...',
  //   icon,
  onChange = noop,
  className,
  buttonText,
  ...props
}: Props) {
  const [search, setSearch] = useState('');

  function onInputHandler(e) {
    const value = e.target.value;
    setSearch(value);
    onChange(value);
  }

  return (
    <div className={`search-container ${className || ''}`}>
      <FaSearch style={{ color: '#777575', margin: '0 10px 0 0' }} />
      <input
        type="text"
        placeholder="Search posts by title..."
        className="search-input sec-font"
        value={search}
        onInput={onInputHandler}
      />
    </div>
  );
}
