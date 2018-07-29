import { RootState } from 'redux/configureStore';

export const getNewTodo = (state: RootState) => state.newTodo;
