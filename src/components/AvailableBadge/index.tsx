import React from 'react';

import './styles.scss';

const AvailableBadge = () => {
  return (
    <div className="badge-container sec-font">
      <div className="circle-container">
        <span className="ping-animation green-circle"></span>
        {/* <span className="green-circle abs"></span> */}
      </div>
      <div className="badge-text">Available for work</div>
    </div>
  );
};

export default AvailableBadge;
