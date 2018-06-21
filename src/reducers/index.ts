import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import visibilityFilter from './visibilityFilter';
import todos from './todos';
import newTodo from './newTodo';

const rootReducer = combineReducers({
  newTodo,
  todos,
  visibilityFilter,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
