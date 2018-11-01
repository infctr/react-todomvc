import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import cn from 'classnames';

import {
  toggleTodo,
  clearCompleted,
  toggleAll,
  removeTodo,
  editTodo,
} from '../../redux/modules/todos';
import { RootState } from '../../redux/configureStore';
import { ITodo } from '../../types/models';
import {
  getVisibleTodos,
  getActiveTodosCount,
  getCompletedTodosCount,
  getAllCheckedState,
} from '../../selectors/todos';

import Footer from '../Footer';
import TodoItem from './TodoItem';

import styles from './index.module.scss';

const actionCreators = {
  clearCompleted,
  editTodo,
  removeTodo,
  toggleAll,
  toggleTodo,
};

type IDispatchProps = typeof actionCreators;
interface IStateProps {
  activeTodoCount: number;
  allChecked: boolean;
  completedCount: number;
  todos: ReadonlyArray<ITodo>;
}

type IProps = IStateProps & IDispatchProps;

interface IState {
  editing: string | null;
}

class TodoList extends PureComponent<IProps, IState> {
  public readonly state = {
    editing: null,
  };

  private edit = (id: string) => () => this.setState({ editing: id });

  private save = (id: string) => (text: string) =>
    this.setState({ editing: null }, () => this.props.editTodo(id, text));

  public render() {
    const { todos, activeTodoCount, completedCount, allChecked } = this.props;

    const footer = (!!activeTodoCount || !!completedCount) && (
      <Footer
        count={activeTodoCount}
        completedCount={completedCount}
        onClearCompleted={this.props.clearCompleted}
      />
    );

    const main = !!todos.length && (
      <section className={styles.main}>
        <label
          htmlFor="toggle-all"
          className={cn(styles.toggleAll, allChecked && styles.checked)}>
          <input
            id="toggle-all"
            type="checkbox"
            onChange={({ target: { checked } }) =>
              this.props.toggleAll(checked)
            }
            checked={activeTodoCount === 0}
          />
        </label>
        <ul className={styles.list}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editing={this.state.editing === todo.id}
              handleToggle={() => this.props.toggleTodo(todo.id)}
              onRemove={() => this.props.removeTodo(todo.id)}
              onEdit={this.edit(todo.id)}
              onCancel={() => this.setState({ editing: null })}
              onSave={this.save(todo.id)}
            />
          ))}
        </ul>
      </section>
    );

    return (
      <Fragment>
        {main}
        {footer}
      </Fragment>
    );
  }
}

export default connect(
  (state: RootState): IStateProps => ({
    activeTodoCount: getActiveTodosCount(state),
    completedCount: getCompletedTodosCount(state),
    allChecked: getAllCheckedState(state),
    todos: getVisibleTodos(state),
  }),
  (dispatch: Dispatch): IDispatchProps =>
    bindActionCreators(actionCreators, dispatch)
)(TodoList);
