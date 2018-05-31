import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Todo from './Todo';
import Footer from './Footer';
import {
  toggleTodo,
  clearCompleted,
  toggleAll,
  removeTodo,
  editTodo,
} from '../actions/index';

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
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    editTodo: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    activeTodoCount: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
  };

  state = {
    editing: null,
  };

  edit = id => () => this.setState({ editing: id });

  save = id => text =>
    this.setState({ editing: null }, () => this.props.editTodo(id, text));

  render() {
    const { todos, activeTodoCount, completedCount } = this.props;

    const footer = (activeTodoCount || completedCount) && (
      <Footer
        count={activeTodoCount}
        completedCount={completedCount}
        onClearCompleted={this.props.clearCompleted}
      />
    );

    const main = todos.length && (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={e => this.props.toggleAll(e.target.checked)}
          checked={activeTodoCount === 0}
        />
        <label htmlFor="toggle-all" />
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

    return {
      activeTodoCount,
      todos: getVisibleTodos(todos, visibilityFilter),
      completedCount: todos.length - activeTodoCount,
    };
  },
  dispatch =>
    bindActionCreators(
      {
        toggleTodo,
        clearCompleted,
        toggleAll,
        removeTodo,
        editTodo,
      },
      dispatch
    )
)(TodoList);
