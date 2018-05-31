import uuid from 'uuid';
import * as actionTypes from '../constants/actionTypes';

const todos = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          title: action.title,
          completed: false,
          id: uuid.v4(),
        },
      ];

    case actionTypes.TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          });
        }
        return todo;
      });

    case actionTypes.REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case actionTypes.TOGGLE_ALL:
      return state.map(todo =>
        Object.assign({}, todo, { completed: action.checked })
      );

    case actionTypes.EDIT_TODO: {
      const { id, title } = action;

      return state.map(
        todo => (todo.id === id ? Object.assign({}, todo, { title }) : todo)
      );
    }
    case actionTypes.CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
};

export default todos;
