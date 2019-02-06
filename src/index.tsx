import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import ls from 'localStorage';

import App from './components/App';
import rootReducer from './redux/configureStore';

import './index.css';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

const storageKey = 'react-todomvc';
const persistedState = ls.getItem(storageKey);
const store = createStore(
  rootReducer,
  persistedState,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(
  throttle(
    () =>
      ls.setItem(storageKey, {
        newTodo: store.getState().newTodo,
        todos: store.getState().todos,
      }),
    1000
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
