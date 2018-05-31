import React, { Fragment, PureComponent } from 'react';
import Todo from './Todo';
import Footer from './Footer';
import PropTypes from 'prop-types';

export default class TodoList extends PureComponent {
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

  constructor(props) {
    super(props);

    this.state = {
      editing: null,
    };
  }

  edit = id => () => this.setState({ editing: id });

  save = id => text => {
    this.props.editTodo(id, text);

    this.setState({ editing: null });
  };

  render() {
    const { todos, activeTodoCount, completedCount } = this.props;
    let footer;
    let main;

    if (activeTodoCount || completedCount) {
      footer = (
        <Footer
          count={activeTodoCount}
          completedCount={completedCount}
          onClearCompleted={this.props.clearCompleted}
        />
      );
    }

    if (todos.length) {
      main = (
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
    }

    return (
      <Fragment>
        {main}
        {footer}
      </Fragment>
    );
  }
}
