// src/components/Code.js
import React from 'react';
import Highlight, { themes } from 'prism-react-renderer';

const Code = ({ children, language = 'js', title }) => {
  const code = typeof children === 'string' ? children.trim() : '';

  return (
    <div style={{ margin: '2rem 0', fontSize: '0.9rem' }}>
      {title && (
        <div
          style={{
            background: '#1e1e1e',
            color: '#fff',
            padding: '0.5rem 1rem',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
          }}
        >
          {title}
        </div>
      )}

      <Highlight code={children} language="jsx" />
    </div>
  );
};

export default Code;
