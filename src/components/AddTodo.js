/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({ handleChange, handleKeyDown, ...props }) => (
  <input
    className="new-todo"
    placeholder="What needs to be done?"
    autoFocus
    onChange={handleChange}
    onKeyDown={handleKeyDown}
    {...props}
  />
);

AddTodo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

export default AddTodo;
