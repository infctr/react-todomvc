import { combineReducers } from 'redux';

import visibilityFilter from './visibilityFilter';
import todos from './todos';
import newTodo from './newTodo';

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  newTodo,
});

export default todoApp;
