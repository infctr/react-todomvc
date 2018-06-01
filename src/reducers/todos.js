import uuid from 'uuid';

import { switchCase } from '../utils';
import * as actionTypes from '../constants/actionTypes';

const todos = (state = [], action) =>
  switchCase({
    [actionTypes.ADD_TODO]: () => [
      ...state,
      {
        title: action.title,
        completed: false,
        id: uuid.v4(),
      },
    ],

    [actionTypes.TOGGLE_TODO]: () =>
      state.map(
        todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      ),

    [actionTypes.REMOVE_TODO]: () =>
      state.filter(todo => todo.id !== action.id),

    [actionTypes.TOGGLE_ALL]: () =>
      state.map(todo => ({ ...todo, completed: action.checked })),

    [actionTypes.EDIT_TODO]: () =>
      state.map(
        todo =>
          todo.id === action.id ? { ...todo, title: action.title } : todo
      ),

    [actionTypes.CLEAR_COMPLETED]: () => state.filter(todo => !todo.completed),
  })(() => state)(action.type)();

export default todos;
