import uuid from 'uuid';
import {
  ADD_TODO,
  TOGGLE_TODO,
  CLEAR_COMPLETED,
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

    case CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
};

export default todos;
