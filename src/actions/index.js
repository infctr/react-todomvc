import * as actionTypes from '../constants/actionTypes';

/*
 * action creators
 */

export const addTodo = title => ({
  type: actionTypes.ADD_TODO,
  title,
});

export const toggleTodo = id => ({
  type: actionTypes.TOGGLE_TODO,
  id,
});

export const removeTodo = id => ({
  type: actionTypes.REMOVE_TODO,
  id,
});

export const editTodo = (id, title) => ({
  type: actionTypes.EDIT_TODO,
  id,
  title,
});

export const clearCompleted = () => ({ type: actionTypes.CLEAR_COMPLETED });

export const toggleAll = checked => ({
  type: actionTypes.TOGGLE_ALL,
  checked,
});

export const setVisibilityFilter = filter => ({
  type: actionTypes.SET_VISIBILITY_FILTER,
  filter,
});

export const setNewTodo = title => ({
  type: actionTypes.SET_NEW_TODO,
  title,
});
