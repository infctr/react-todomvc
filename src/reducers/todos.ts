import uuid from 'uuid';
import { ActionType } from 'typesafe-actions';

import * as actionTypes from 'constants/actionTypes';
import { todos as todosActions } from 'actions';
import { Todo } from 'types/models';

export type TodosAction = ActionType<typeof todosActions>;
export type TodosState = ReadonlyArray<Todo>;

const todos = (state: TodosState = [], action: TodosAction) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          completed: false,
          id: uuid.v4(),
          title: action.payload.title,
        },
      ];

    case actionTypes.TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
      );

    case actionTypes.REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);

    case actionTypes.TOGGLE_ALL:
      return state.map(todo => ({
        ...todo,
        completed: action.payload.checked,
      }));

    case actionTypes.EDIT_TODO:
      return state.map(
        todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
      );

    case actionTypes.CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
};

export default todos;
