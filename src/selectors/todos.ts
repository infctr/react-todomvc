import { createSelector } from 'reselect';

import { RootState } from '../redux/configureStore';
import { VisibilityFilters } from '../types/models';
import { getVisibilityFilter } from './visibilityFilter';

const getTodos = (state: RootState) => state.todos;

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.completed);

      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.completed);

      case VisibilityFilters.SHOW_ALL:
      default:
        return todos;
    }
  }
);

export const getActiveTodosCount = createSelector([getTodos], todos =>
  todos.reduce((accum, todo) => (todo.completed ? accum : accum + 1), 0)
);

export const getCompletedTodosCount = createSelector(
  [getTodos, getActiveTodosCount],
  (todos, activeTodoCount) => todos.length - activeTodoCount
);

export const getAllCheckedState = createSelector(
  [getTodos, getCompletedTodosCount],
  (todos, completedTodoCount) => todos.length === completedTodoCount
);
