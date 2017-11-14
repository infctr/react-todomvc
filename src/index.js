import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import '../node_modules/todomvc-app-css/index.css';

ReactDOM.render(
  <App storageKey="react-todomvc" />,
  document.getElementById('todoapp')
);
