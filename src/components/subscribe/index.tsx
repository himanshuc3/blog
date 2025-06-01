import * as React from 'react';
import './styles.scss';
import Input from '../input';

const Subscribe: React.FC<{}> = () => {
  return (
    <div className="subscribe">
      <h2 className="heading">🚨 Stay Updated on my pitfalls.</h2>
      <p className="desc sec-font">
        Frontend explorations. Naive backend interfaces. Performance benchmarking. Daily life rants.
        Swatcch Bharat nakabhiyan & more.
      </p>
      <Input disabled={true} placeholder="Coming Soon..." className="email-input" />
      {/* <p className='comming-soon sec-font'>Comming soon</p> */}
    </div>
  );
};

export default Subscribe;
