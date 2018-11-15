import { action as actionCreator, ActionType } from 'typesafe-actions';
import uuid from 'uuid';

import { ITodo } from '../../types/models';
import { switchCase } from '../../utils/switchCase';

const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const CLEAR_COMPLETED = 'todos/CLEAR_COMPLETED';
const TOGGLE_ALL = 'todos/TOGGLE_ALL';
const REMOVE_TODO = 'todos/REMOVE_TODO';
const EDIT_TODO = 'todos/EDIT_TODO';

export const addTodo = (title: string) => actionCreator(ADD_TODO, { title });

export const toggleTodo = (id: string) => actionCreator(TOGGLE_TODO, { id });

export const removeTodo = (id: string) => actionCreator(REMOVE_TODO, { id });

export const editTodo = (id: string, title: string) =>
  actionCreator(EDIT_TODO, { id, title });

export const clearCompleted = () => actionCreator(CLEAR_COMPLETED, null);

export const toggleAll = (checked: boolean) =>
  actionCreator(TOGGLE_ALL, { checked });

interface ITodosActions {
  addTodo: typeof addTodo;
  toggleTodo: typeof toggleTodo;
  removeTodo: typeof removeTodo;
  editTodo: typeof editTodo;
  clearCompleted: typeof clearCompleted;
  toggleAll: typeof toggleAll;
}

type ITodosAction = ActionType<ITodosActions>;
type ITodosState = ReadonlyArray<ITodo>;

export default function todos(
  state: ITodosState = [],
  action: ITodosAction
): ITodosState {
  const reducer = switchCase<ITodosAction, ITodosState>({
    [ADD_TODO]: (payload): ITodosState => [
      ...state,
      {
        completed: false,
        id: uuid.v4(),
        title: payload.title,
      },
    ],

    [TOGGLE_TODO]: (payload): ITodosState =>
      state.map(
        todo =>
          todo.id === payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
      ),

    [REMOVE_TODO]: (payload): ITodosState =>
      state.filter(todo => todo.id !== payload.id),

    [TOGGLE_ALL]: (payload): ITodosState =>
      state.map(todo => ({
        ...todo,
        completed: payload.checked,
      })),

    [EDIT_TODO]: (payload): ITodosState =>
      state.map(
        todo =>
          todo.id === payload.id ? { ...todo, title: payload.title } : todo
      ),

    [CLEAR_COMPLETED]: (): ITodosState => state.filter(todo => !todo.completed),
  })(() => state);

  return reducer(action.type)(action.payload);
}
