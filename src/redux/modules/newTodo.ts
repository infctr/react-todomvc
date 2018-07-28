import { action as actionCreator, ActionType } from 'typesafe-actions';

const SET_NEW_TODO = 'new_todo/SET_NEW_TODO';

export const setNewTodo = (title: string) => actionCreator(SET_NEW_TODO, title);

type NewTodoState = string;
type NewTodoActions = ActionType<typeof setNewTodo>;

export default function reducer(
  state: NewTodoState = '',
  action: NewTodoActions
): NewTodoState {
  switch (action.type) {
    case SET_NEW_TODO:
      return action.payload;

    default:
      return state;
  }
}
