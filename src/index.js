import React from 'react';
import { render } from 'react-dom';
// import { HashRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import TodoApp from './reducers/index';
import { storage } from './utils/index';
import throttle from 'lodash/throttle';

import '../node_modules/todomvc-app-css/index.css';

const storageKey = 'react-todomvc';
const persistedState = storage(storageKey);
const store = createStore(TodoApp, persistedState);

store.subscribe(
  throttle(() => {
    storage(storageKey, {
      todos: store.getState().todos,
      newTodo: store.getState().newTodo,
    });
  }, 1000)
);

// <HashRouter>
//   <Provider store={store}>
//     <Route
//       path="/"
//       render={props => <TodoList {...props} storageKey="react-todomvc2" />}
//     />
//   </Provider>
// </HashRouter>,
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
