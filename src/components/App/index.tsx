import React, { Fragment } from 'react';

import TodoList from 'components/Todos';
import AddTodo from 'components/AddTodo';

import styles from './index.module.scss';

const App: React.SFC = () => (
  <Fragment>
    <div className={styles.todoapp}>
      <header>
        <h1 className={styles.header}>todos</h1>
        <AddTodo />
      </header>
      <TodoList />
    </div>
    <footer className={styles.info}>
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
