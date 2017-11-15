import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { hashHistory, Router, Route } from 'react-router';

import '../node_modules/todomvc-app-css/index.css';

render(
  <Router history={hashHistory}>
    <Route path="/" component={App} storageKey="react-todomvc" />
    <Route path="/:filterRoute" component={App} storageKey="react-todomvc" />
  </Router>,
  document.getElementById('root')
);
