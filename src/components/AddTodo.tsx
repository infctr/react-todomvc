import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { setNewTodo } from '../actions/newTodo';
import { addTodo } from '../actions/todos';
import { CodeKeys } from '../constants/codeKeys';
import { RootState } from '../reducers';

export interface AddTodoProps {
  addTodo: typeof addTodo;
  setNewTodo: typeof setNewTodo;
  value: string;
}

const AddTodo: React.SFC<AddTodoProps> = props => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.keyCode !== CodeKeys.ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = event.currentTarget.value.trim();

    if (val) {
      props.addTodo(val);
      props.setNewTodo('');
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event =>
    props.setNewTodo(event.target.value);

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={props.value}
    />
  );
};

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  setNewTodo: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default connect(
  ({ newTodo }: RootState) => ({
    value: newTodo,
  }),
  (dispatch: Dispatch) => bindActionCreators({ setNewTodo, addTodo }, dispatch)
)(AddTodo);
