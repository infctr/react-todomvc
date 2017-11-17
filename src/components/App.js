import React from 'react';
import uuid from 'uuid';
import Todo from './Todo';
import Footer from './Footer';
import itemTypes from '../constants/itemTypes';
import codeKeys from '../constants/codeKeys';
import { store } from '../utils/index';

function getFilterRouteType(route) {
  switch (route) {
    case '/active':
      return itemTypes.ACTIVE_TODOS;

    case '/completed':
      return itemTypes.COMPLETED_TODOS;

    default:
      return itemTypes.ALL_TODOS;
  }
}

export default class App extends React.Component {
  constructor(props) {
    const { location } = props;

    super(props);

    this.storageKey = props.storageKey;
    this.state = {
      todos: store(this.storageKey) || [],
      nowShowing: getFilterRouteType(location.pathname),
      editing: null,
      newTodo: '',
    };
  }

  handleChange = event => {
    this.setState({ newTodo: event.target.value });
  };

  handleNewTodoKeyDown = event => {
    if (event.keyCode !== codeKeys.ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = this.state.newTodo.trim();

    if (val) {
      this.setState(({ todos }) => ({
        todos: [
          ...todos,
          {
            id: uuid.v4(),
            title: val,
            completed: false,
          },
        ],
        newTodo: '',
      }));
    }
  };

  toggleAll = event => {
    const checked = event.target.checked;

    this.setState(({ todos }) => ({
      todos: todos.map(todo => Object.assign({}, todo, { completed: checked })),
    }));
  };

  toggle = todoToToggle => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => {
        return todo !== todoToToggle
          ? todo
          : Object.assign({}, todo, { completed: !todo.completed });
      }),
    }));
  };

  remove = todo => {
    this.setState(({ todos }) => ({
      todos: todos.filter(candidate => candidate !== todo),
    }));
  };

  edit = todo => {
    this.setState({ editing: todo.id });
  };

  save = (todoToSave, text) => {
    this.setState(({ todos }) => ({
      todos: todos.map(
        todo =>
          todo !== todoToSave ? todo : Object.assign({}, todo, { title: text })
      ),
      editing: null,
    }));
  };

  cancel = () => {
    this.setState({ editing: null });
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => !todo.completed),
    }));
  };

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;

    this.setState({
      nowShowing: getFilterRouteType(location.pathname),
    });
  }

  render() {
    store(this.storageKey, this.state.todos);

    let footer, main;
    const { nowShowing, todos } = this.state;

    const shownTodos = todos.filter(function(todo) {
      switch (nowShowing) {
        case itemTypes.ACTIVE_TODOS:
          return !todo.completed;

        case itemTypes.COMPLETED_TODOS:
          return todo.completed;

        default:
          return true;
      }
    }, this);

    const todoItems = shownTodos.map(function(todo) {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onRemove={this.remove.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel}
        />
      );
    }, this);

    const activeTodoCount = todos.reduce(function(accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer = (
        <Footer
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={nowShowing}
          onClearCompleted={this.clearCompleted}
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
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <label htmlFor="toggle-all" />
          <ul className="todo-list">{todoItems}</ul>
        </section>
      );
    }

    return (
      <div>
        <div className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.newTodo}
              onKeyDown={this.handleNewTodoKeyDown}
              onChange={this.handleChange}
              autoFocus={true}
            />
          </header>
          {main}
          {footer}
        </div>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            Created by <a href="http://github.com/petehunt/">petehunt</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
          <p>
            Forked by <a href="https://github.com/infctr">infctr</a>
          </p>
        </footer>
      </div>
    );
  }
}
