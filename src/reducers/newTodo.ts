import { ActionType } from 'typesafe-actions';

import { SET_NEW_TODO } from 'constants/actionTypes';
import { newTodo as newTodoActions } from 'actions';

export type NewTodoState = string;
export type NewTodoAction = ActionType<typeof newTodoActions>;

const newTodo = (state: NewTodoState = '', action: NewTodoAction) => {
  switch (action.type) {
    case SET_NEW_TODO:
      return action.payload;

    default:
      return state;
  }
};

export default newTodo;
