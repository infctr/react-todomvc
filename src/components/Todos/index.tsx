import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import cn from 'classnames';

import Footer from 'components/Footer';
import {
  toggleTodo,
  clearCompleted,
  toggleAll,
  removeTodo,
  editTodo,
} from 'actions/todos';
import { RootState } from 'reducers';
import { Todo, VisibilityFilters } from 'types/models';
import TodoItem from './TodoItem';

import styles from './index.module.scss';

const getVisibleTodos = (
  todos: ReadonlyArray<Todo>,
  filter: VisibilityFilters
) => {
  switch (filter) {
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);

    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);

    case VisibilityFilters.SHOW_ALL:
    default:
      return todos;
  }
};

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
  todos: ReadonlyArray<Todo>;
}

interface IProps extends IStateProps, IDispatchProps {}

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
  ({ todos, visibilityFilter }: RootState) => {
    const activeTodoCount = todos.reduce(
      (accum, todo) => (todo.completed ? accum : accum + 1),
      0
    );
    const completedCount = todos.length - activeTodoCount;

    return {
      activeTodoCount,
      completedCount,
      allChecked: todos.length === completedCount,
      todos: getVisibleTodos(todos, visibilityFilter),
    };
  },

  (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch)
)(TodoList);
