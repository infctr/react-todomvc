import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import TodoApp from './reducers';

import '../node_modules/todomvc-app-css/index.css';

let store = createStore(TodoApp);

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
    <App storageKey="react-todomvc2" />
  </Provider>,
  document.getElementById('root')
);
