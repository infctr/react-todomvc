import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  CLEAR_COMPLETED,
  SET_NEW_TODO,
} from '../constants/actionTypes';

/*
 * action creators
 */

export const addTodo = title => {
  return {
    type: ADD_TODO,
    title,
  };
};

export const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};

export const clearCompleted = () => {
  return { type: CLEAR_COMPLETED };
};

export const setVisibilityFilter = filter => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  };
};

export const setNewTodo = title => {
  return {
    type: SET_NEW_TODO,
    title,
  };
};
