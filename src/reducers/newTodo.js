import { SET_NEW_TODO } from '../constants/actionTypes';

const newTodo = (state = '', action) => {
  switch (action.type) {
    case SET_NEW_TODO:
      return action.title;

    default:
      return state;
  }
};

export default newTodo;
