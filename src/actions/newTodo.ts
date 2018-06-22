import { action } from 'typesafe-actions';

import { SET_NEW_TODO } from '../constants/actionTypes';

export const setNewTodo = (title: string) => action(SET_NEW_TODO, title);

export default setNewTodo;
