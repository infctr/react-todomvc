import { action } from 'typesafe-actions';
import * as actionTypes from 'constants/actionTypes';

export const addTodo = (title: string) =>
  action(actionTypes.ADD_TODO, { title });

export const toggleTodo = (id: string) =>
  action(actionTypes.TOGGLE_TODO, { id });

export const removeTodo = (id: string) =>
  action(actionTypes.REMOVE_TODO, { id });

export const editTodo = (id: string, title: string) =>
  action(actionTypes.EDIT_TODO, { id, title });

export const clearCompleted = () => action(actionTypes.CLEAR_COMPLETED);

export const toggleAll = (checked: boolean) =>
  action(actionTypes.TOGGLE_ALL, { checked });
