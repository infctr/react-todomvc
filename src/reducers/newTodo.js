import { SET_NEW_TODO } from '../constants/actionTypes';
import { switchCase } from '../utils';

const newTodo = (state = '', action) =>
  switchCase({
    [SET_NEW_TODO]: () => action.title,
  })(() => state)(action.type)();

export default newTodo;
