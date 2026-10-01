import React from 'react';
import './styles.scss';

type Props = {
  text: string;
  highlighted?: boolean;
};

const Tag: React.FC<Props> = ({ text, highlighted = false }) => {
  return (
    <span className={`tag ${highlighted ? 'highlighted' : ''} `} data-tag={text}>
      {text}
    </span>
  );
};

export default Tag;
