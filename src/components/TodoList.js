import React from 'react';
import Todo from './Todo';
import Footer from './Footer';
import AddTodo from './AddTodo';
import itemTypes from '../constants/itemTypes';
import codeKeys from '../constants/codeKeys';
import { store } from '../utils/index';
import PropTypes from 'prop-types';

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
  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  };

  constructor(props) {
    const { location } = props;

    super(props);
    console.log('props', props);

    // this.storageKey = props.storageKey;
    // this.state = {
    //   todos: store(this.storageKey) || [],
    //   visibilityFilter: getFilterRouteType(location.pathname),
    //   editing: null,
    //   newTodo: '',
    // };
  }

  toggleAll = event => {
    const checked = event.target.checked;

    this.setState(({ todos }) => ({
      todos: todos.map(todo => Object.assign({}, todo, { completed: checked })),
    }));
  };

  toggle = todoToToggle => {
    this.props.toggleTodo(todoToToggle);
    // this.setState(({ todos }) => ({
    //   todos: todos.map(todo => {
    //     return todo !== todoToToggle
    //       ? todo
    //       : Object.assign({}, todo, { completed: !todo.completed });
    //   }),
    // }));
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

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;

    // this.setState({
    //   visibilityFilter: getFilterRouteType(location.pathname),
    // });
  }

  render() {
    // store(this.storageKey, this.state.todos);

    const { handleToggle, todos, activeTodoCount, completedCount } = this.props;
    let footer, main;

    // onRemove={this.remove.bind(this, todo)}
    // onEdit={this.edit.bind(this, todo)}
    // editing={this.state.editing === todo.id}
    // onSave={this.save.bind(this, todo)}
    // onCancel={this.cancel}

    if (activeTodoCount || completedCount) {
      footer = (
        <Footer
          count={activeTodoCount}
          completedCount={completedCount}
          onClearCompleted={this.props.clearCompleted}
        />
      );
    }

    //          <input
    //   id="toggle-all"
    //   className="toggle-all"
    //   type="checkbox"
    //   onChange={this.toggleAll}
    //   checked={activeTodoCount === 0}
    // />
    // <label htmlFor="toggle-all" />
    if (todos.length) {
      main = (
        <section className="main">
          <ul className="todo-list">
            {todos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                handleToggle={handleToggle.bind(null, todo.id)}
              />
            ))}
          </ul>
        </section>
      );
    }

    return (
      <div>
        {main}
        {footer}
      </div>
    );
  }
}
