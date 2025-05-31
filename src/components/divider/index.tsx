import React from 'react';

import './styles.scss';
import Star from '../Star';

const Divider = ({ darkTheme }: { darkTheme: boolean }) => {
  const color = darkTheme ? 'white' : 'black';
  return (
    <div className="divider">
      <Star color={color} className="wing-star" />
      <div className="hr" />
      <Star color={color} />
      <div className="hr" />
      <Star color={color} className="wing-star" />
    </div>
  );
};

export default Divider;
