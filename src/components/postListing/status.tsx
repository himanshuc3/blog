import React from 'react';
import { FireOutlined } from '@ant-design/icons';

import './status.scss';

interface StatusProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Status({ text, className, children }: StatusProps) {
  return (
    <p className={`status ${className || ''}`}>
      {children}
      {text}
    </p>
  );
}
