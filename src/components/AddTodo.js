/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setNewTodo, addTodo } from '../actions/index';
import codeKeys from '../constants/codeKeys';

const AddTodo = props => {
  const handleKeyDown = event => {
    if (event.keyCode !== codeKeys.ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = event.target.value.trim();

    if (val) {
      props.addTodo(val);
      props.setNewTodo('');
    }
  };

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      onChange={({ target: { value } }) => props.setNewTodo(value)}
      onKeyDown={handleKeyDown}
    />
  );
};

AddTodo.propTypes = {
  setNewTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    value: state.newTodo,
  }),
  dispatch => bindActionCreators({ setNewTodo, addTodo }, dispatch)
)(AddTodo);
