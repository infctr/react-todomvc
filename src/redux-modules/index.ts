import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import newTodo from './newTodo';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  newTodo,
  todos,
  visibilityFilter,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
