import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';

import Todo from './Todo';
import Footer from './Footer';
import {
  toggleTodo,
  clearCompleted,
  toggleAll,
  removeTodo,
  editTodo,
} from '../actions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);

    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);

    case 'SHOW_ALL':
    default:
      return todos;
  }
};

class TodoList extends PureComponent {
  static propTypes = {
    activeTodoCount: PropTypes.number.isRequired,
    allChecked: PropTypes.bool.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    completedCount: PropTypes.number.isRequired,
    editTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        completed: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

  state = {
    editing: null,
  };

  edit = id => () => this.setState({ editing: id });

  save = id => text =>
    this.setState({ editing: null }, () => this.props.editTodo(id, text));

  render() {
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
            <Todo
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
  ({ todos, visibilityFilter }) => {
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
  dispatch =>
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
