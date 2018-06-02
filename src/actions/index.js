import * as actionTypes from '../constants/actionTypes';

/*
 * action creators
 */

export const addTodo = title => ({
  title,
  type: actionTypes.ADD_TODO,
});

export const toggleTodo = id => ({
  id,
  type: actionTypes.TOGGLE_TODO,
});

export const removeTodo = id => ({
  id,
  type: actionTypes.REMOVE_TODO,
});

export const editTodo = (id, title) => ({
  id,
  title,
  type: actionTypes.EDIT_TODO,
});

export const clearCompleted = () => ({ type: actionTypes.CLEAR_COMPLETED });

export const toggleAll = checked => ({
  checked,
  type: actionTypes.TOGGLE_ALL,
});

export const setVisibilityFilter = filter => ({
  filter,
  type: actionTypes.SET_VISIBILITY_FILTER,
});

export const setNewTodo = title => ({
  title,
  type: actionTypes.SET_NEW_TODO,
});
