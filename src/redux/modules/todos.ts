import { action as actionCreator, ActionType } from 'typesafe-actions';
import uuid from 'uuid';

import { ITodo } from 'types/models';

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

export const clearCompleted = () => actionCreator(CLEAR_COMPLETED);

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

export type TodosAction = ActionType<ITodosActions>;
export type TodosState = ReadonlyArray<ITodo>;

export default function reducer(
  state: TodosState = [],
  action: TodosAction
): TodosState {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          completed: false,
          id: uuid.v4(),
          title: action.payload.title,
        },
      ];

    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
      );

    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);

    case TOGGLE_ALL:
      return state.map(todo => ({
        ...todo,
        completed: action.payload.checked,
      }));

    case EDIT_TODO:
      return state.map(
        todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
      );

    case CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
}
