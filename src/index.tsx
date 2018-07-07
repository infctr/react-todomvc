import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';

import App from './components/App';
import rootReducer from './reducers';
import { storage } from './utils';

import './index.css';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

const storageKey = 'react-todomvc';
const persistedState = storage(storageKey);
const store = createStore(
  rootReducer,
  persistedState,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
  document.getElementById('root') as HTMLElement
);
