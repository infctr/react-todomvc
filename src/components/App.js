import React from 'react';
import uuid from 'uuid';
import Todo from './Todo';
import Footer from './Footer';
import itemTypes from '../constants/itemTypes';
import codeKeys from '../constants/codeKeys';
import {store} from '../utils/index';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: store(props.storageKey) || [],
      nowShowing: itemTypes.ALL_TODOS,
      editing: null,
      newTodo: ''
    };
  }

  handleChange = (event) => {
    this.setState({newTodo: event.target.value});
  }

  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== codeKeys.ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = this.state.newTodo.trim();

    if (val) {
      this.setState(({todos}) => ({
        todos: [...todos, {
          id: uuid.v4(),
          title: val,
          completed: false
        }],
        newTodo: ''
      }));
    }
  }

  toggleAll = (event) => {
    const checked = event.target.checked;

    this.setState(({todos}) => ({
      todos: todos.map(todo => Object.assign({}, todo, {completed: checked}))
    }));
  }

  toggle = (todoToToggle) => {
    this.setState(({todos}) => ({
      todos: todos.map(todo => {
        return todo !== todoToToggle ?
          todo :
          Object.assign({}, todo, {completed: !todo.completed});
      })
    }));
  }

  remove = (todo) => {
    this.setState(({todos}) => ({
      todos: todos.filter(candidate => candidate !== todo)
    }));
  }

  edit = (todo) => {
    this.setState({editing: todo.id});
  }

  save = (todoToSave, text) => {
    this.setState(({todos}) => ({
      todos: todos.map(todo => (
        todo !== todoToSave ? todo : Object.assign({}, todo, {title: text})
      )),
      editing: null
    }));
  }

  cancel = () => {
    this.setState({editing: null});
  }

  clearCompleted = () => {
    this.setState(({todos}) => ({
      todos: todos.filter(todo => !todo.completed)
    }));
  }

  render() {
    store(this.props.storageKey, this.state.todos);

    let footer, main;
    const {nowShowing, todos} = this.state;

    const shownTodos = todos.filter(function (todo) {
      switch (nowShowing) {
        case itemTypes.ACTIVE_TODOS:
          return !todo.completed;

        case itemTypes.COMPLETED_TODOS:
          return todo.completed;

        default:
          return true;
      }
    }, this);

    const todoItems = shownTodos.map(function (todo) {
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

    const activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <Footer
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={nowShowing}
          onClearCompleted={this.clearCompleted}
        />;
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }

    return (
      <div>
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
    );
  }

  componentDidMount() {
    // var setState = this.setState;
    // var router = Router({
    //   '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
    //   '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
    //   '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
    // });
    // router.init('/');
  }
}
