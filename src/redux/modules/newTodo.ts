import { action as actionCreator, ActionType } from 'typesafe-actions';

import { switchCase } from '../../utils/switcCase';

const SET_NEW_TODO = 'new_todo/SET_NEW_TODO';

export const setNewTodo = (title: string) => actionCreator(SET_NEW_TODO, title);

type INewTodoState = string;
type INewTodoActions = ActionType<typeof setNewTodo>;

export default function newTodo(
  state: INewTodoState = '',
  action: INewTodoActions
): INewTodoState {
  const reducer = switchCase<INewTodoActions, INewTodoState>({
    [SET_NEW_TODO]: (payload): INewTodoState => payload,
  })(() => state);

  return reducer(action.type)(action.payload);
}
