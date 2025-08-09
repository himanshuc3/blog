import * as React from 'react';
import { IoMail } from 'react-icons/io5';

import './styles.scss';
import Input from '../input';

const Subscribe: React.FC<{ darkTheme: boolean }> = ({ darkTheme }) => {
  return (
    <div className="subscribe">
      <div>
        <h1 className="sec-font">Subscribe to my pitfalls</h1>
        <form
          action="
        https://buttondown.com/api/emails/embed-subscribe/chhabra
        "
          method="post"
        >
          <Input
            icon={<IoMail color={darkTheme ? 'white' : 'black'} />}
            placeholder="johndoe@gmail.com"
            className="email-input"
            buttonText="Sign me up ✌️"
          />
        </form>
        <p className="sec-font subscribe-subtext">Everything code. Unsubscribe anytime.</p>
      </div>
    </div>
  );
};

export default Subscribe;
