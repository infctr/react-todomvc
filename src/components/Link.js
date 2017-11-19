import React from 'react';
import classNames from 'classnames';

const Link = ({ filter, text, active, ...props }) => {
  console.log('props', props);
  return (
    <li>
      <a className={classNames({ selected: active })} {...props}>
        {text}
      </a>
    </li>
  );
};

export default Link;
