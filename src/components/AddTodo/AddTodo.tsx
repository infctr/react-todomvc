import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CodeKeys } from '../../constants/codeKeys';
import { addTodo } from '../../redux/modules/todos';
import { RootState } from '../../redux/configureStore';
import { setNewTodo } from '../../redux/modules/newTodo';
import { getNewTodo } from '../../selectors/newTodo';

import styles from './AddTodo.module.scss';

const actionCreators = { setNewTodo, addTodo };

interface IStateProps {
  value: string;
}
type IDispatchProps = typeof actionCreators;

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

export default connect<IStateProps, IDispatchProps, void, RootState>(
  state => ({ value: getNewTodo(state) }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(AddTodo);
