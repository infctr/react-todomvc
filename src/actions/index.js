import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  CLEAR_COMPLETED,
  SET_NEW_TODO,
  TOGGLE_ALL,
  REMOVE_TODO,
  EDIT_TODO,
} from '../constants/actionTypes';

/*
 * action creators
 */

export const addTodo = title => ({
  type: ADD_TODO,
  title,
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  id,
});

export const editTodo = (id, title) => ({
  type: EDIT_TODO,
  id,
  title,
});

export const clearCompleted = () => ({ type: CLEAR_COMPLETED });

export const toggleAll = checked => ({
  type: TOGGLE_ALL,
  checked,
});

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});

export const setNewTodo = title => ({
  type: SET_NEW_TODO,
  title,
});
