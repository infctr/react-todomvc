import uuid from 'uuid';
import {
  ADD_TODO,
  TOGGLE_TODO,
  CLEAR_COMPLETED,
  TOGGLE_ALL,
  REMOVE_TODO,
  EDIT_TODO,
} from '../constants/actionTypes';

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          title: action.title,
          completed: false,
          id: uuid.v4(),
        },
      ];

    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          });
        }
        return todo;
      });

    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case TOGGLE_ALL:
      return state.map(todo =>
        Object.assign({}, todo, { completed: action.checked })
      );

    case EDIT_TODO:
      let { id, title } = action;

      return state.map(
        todo => (todo.id === id ? Object.assign({}, todo, { title }) : todo)
      );

    case CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
};

export default todos;
