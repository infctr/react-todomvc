import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';

import App from './components/App';
import TodoApp from './reducers';
import { storage } from './utils';

import './index.css';

const storageKey = 'react-todomvc';
const persistedState = storage(storageKey);
const store = createStore(TodoApp, persistedState);

store.subscribe(
  throttle(() => {
    storage(storageKey, {
      newTodo: store.getState().newTodo,
      todos: store.getState().todos,
    });
  }, 1000)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
