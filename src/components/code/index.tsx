// src/components/Code.js
import React, { useContext, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ThemeContext from '../../hooks/themeContext';
import './index.scss';

const DARK_THEME = {
  ...atomDark,
};

const LIGHT_THEME = {
  ...coldarkCold,
  'pre[class*="language-"]': {
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
};

const Code = ({ children, language = 'js', title, className, highlightLines = [] }) => {
  const { darkTheme } = useContext(ThemeContext);
  const lang = className.replace(/language-/, '') || 'js';
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    navigator.clipboard.writeText(children.trim());
  }
  return (
    <div className="codeblock">
      <button className="button" onClick={handleCopy} disabled={copied}>
        {copied ? 'copied' : 'copy'}
      </button>
      <SyntaxHighlighter
        language={lang}
        style={darkTheme ? DARK_THEME : LIGHT_THEME}
        showLineNumbers={false}
        customStyle={{
          borderRadius: '10px',
          padding: '30px',
          border: '1px solid var(--variable-hoverBG)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowX: 'auto',
        }}
        codeTagProps={{
          style: {
            whiteSpace: 'pre-wrap', // ✅ enable actual wrapping inside <code>
            wordBreak: 'break-word',
          },
        }}
        wrapLines
        lineProps={(lineNumber) => {
          const style = highlightLines.includes(lineNumber)
            ? { backgroundColor: 'rgba(255, 229, 100, 0.2)' }
            : {};
          return { style };
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
