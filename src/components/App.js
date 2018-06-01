import React, { Fragment } from 'react';

import TodoList from './TodoList';
import AddTodo from './AddTodo';

const App = props => (
  <Fragment>
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <TodoList {...props} />
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
  </Fragment>
);

export default App;
