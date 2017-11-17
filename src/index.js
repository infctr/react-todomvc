import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { HashRouter, Route } from 'react-router-dom';

import '../node_modules/todomvc-app-css/index.css';

// <App storageKey="react-todomvc" />
render(
  <HashRouter>
    <Route
      path="/"
      render={props => <App {...props} storageKey="react-todomvc" />}
    />
  </HashRouter>,
  document.getElementById('root')
);
