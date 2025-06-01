import * as React from 'react';
import './styles.scss';
import Input from '../input';
import { MailOutlined } from '@ant-design/icons';
const Subscribe: React.FC<{}> = () => {
  return (
    <div className="subscribe">
      <h2 className="heading">🚨 Stay Updated on my pitfalls.</h2>
      <p className="desc sec-font">
        Frontend explorations. Naive backend interfaces. Performance benchmarking. Daily life rants.
        Swatcch Bharat nakabhiyan & more.
      </p>
      <form
        action="
          https://buttondown.com/api/emails/embed-subscribe/chhabra
         "
        method="post"
      >
        <Input
          icon={<MailOutlined style={{ color: '#777575', margin: '0 10px' }} />}
          placeholder="johndoe@gmail.com"
          className="email-input"
        />
      </form>
    </div>
  );
};

export default Subscribe;
