import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { addTodo } from 'redux-modules/todos';
import { CodeKeys } from 'constants/codeKeys';
import { RootState } from 'redux-modules';
import { setNewTodo } from 'redux-modules/newTodo';

import styles from './index.module.scss';

const actionCreatores = { setNewTodo, addTodo };

interface IStateProps {
  value: string;
}
type IDispatchProps = typeof actionCreatores;

interface IProps extends IStateProps, IDispatchProps {}

const AddTodo: React.SFC<IProps> = props => {
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
      className={styles.newTodo}
      placeholder="What needs to be done?"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={props.value}
    />
  );
};

export default connect(
  ({ newTodo }: RootState) => ({
    value: newTodo,
  }),
  (dispatch: Dispatch) => bindActionCreators(actionCreatores, dispatch)
)(AddTodo);
