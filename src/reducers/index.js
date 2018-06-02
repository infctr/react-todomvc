import { combineReducers } from 'redux';

import visibilityFilter from './visibilityFilter';
import todos from './todos';
import newTodo from './newTodo';

const todoApp = combineReducers({
  newTodo,
  todos,
  visibilityFilter,
});

export default todoApp;
