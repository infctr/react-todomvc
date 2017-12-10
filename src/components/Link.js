import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Link = ({ text, active, ...props }) => (
  <li>
    <a className={classNames({ selected: active })} {...props}>
      {text}
    </a>
  </li>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Link;
