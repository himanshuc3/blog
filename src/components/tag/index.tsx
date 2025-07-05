import React from 'react';
import './styles.scss';
import Icon, { FireTwoTone } from '@ant-design/icons';

type Props = {
  text: string;
  highlighted: boolean;
};

const Tag: React.FC<Props> = ({ text, highlighted = false }) => {
  return (
    <span className={`tag sec-font ${highlighted ? 'highlighted' : ''} `} data-tag={text}>
      {text}
    </span>
  );
};

export default Tag;
