import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';

import TodoItem from './TodoItem';
import Footer from './Footer';
import {
  toggleTodo,
  clearCompleted,
  toggleAll,
  removeTodo,
  editTodo,
} from '../actions/todos';
import { todoPropTypes } from './propTypes';
import { RootState } from '../reducers';
import { Todo, VisibilityFilters } from '../types/models';

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

interface TodoListProps {
  activeTodoCount: number;
  allChecked: boolean;
  clearCompleted: typeof clearCompleted;
  completedCount: number;
  editTodo: typeof editTodo;
  removeTodo: typeof removeTodo;
  todos: ReadonlyArray<Todo>;
  toggleAll: typeof toggleAll;
  toggleTodo: typeof toggleTodo;
}

interface TodoListState {
  editing: string;
}

class TodoList extends PureComponent<TodoListProps, TodoListState> {
  public static propTypes = {
    activeTodoCount: PropTypes.number.isRequired,
    allChecked: PropTypes.bool.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    completedCount: PropTypes.number.isRequired,
    editTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(todoPropTypes).isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

  public readonly state = {
    editing: '',
  };

  private edit = (id: string) => () => this.setState({ editing: id });

  private save = (id: string) => (text: string) =>
    this.setState({ editing: '' }, () => this.props.editTodo(id, text));

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
      <section className="main">
        <label
          htmlFor="toggle-all"
          className={cn('toggle-all', allChecked && 'checked')}>
          <input
            id="toggle-all"
            type="checkbox"
            onChange={({ target: { checked } }) =>
              this.props.toggleAll(checked)
            }
            checked={activeTodoCount === 0}
          />
        </label>
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editing={this.state.editing === todo.id}
              handleToggle={() => this.props.toggleTodo(todo.id)}
              onRemove={() => this.props.removeTodo(todo.id)}
              onEdit={this.edit(todo.id)}
              onCancel={() => this.setState({ editing: '' })}
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

  (dispatch: Dispatch) =>
    bindActionCreators(
      {
        clearCompleted,
        editTodo,
        removeTodo,
        toggleAll,
        toggleTodo,
      },
      dispatch
    )
)(TodoList);
