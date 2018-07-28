import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import newTodo from './modules/newTodo';
import todos from './modules/todos';
import visibilityFilter from './modules/visibilityFilter';

const rootReducer = combineReducers({
  newTodo,
  todos,
  visibilityFilter,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
