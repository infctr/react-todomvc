import React from 'react';

import { TodoList } from '../TodoList';
import { AddTodo } from '../AddTodo';

import styles from './App.module.scss';

const App: React.SFC = () => (
  <>
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
  </>
);

export default App;
