import { connect } from 'react-redux';
import {
  toggleTodo,
  clearCompleted,
  toggleAll,
  removeTodo,
  editTodo,
} from '../actions/index';
import TodoList from '../components/TodoList';
import { bindActionCreators } from 'redux';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);

    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);

    case 'SHOW_ALL':
    default:
      return todos;
  }
};

const mapStateToProps = ({ todos, visibilityFilter }) => {
  const activeTodoCount = todos.reduce(
    (accum, todo) => (todo.completed ? accum : accum + 1),
    0
  );

  return {
    activeTodoCount,
    todos: getVisibleTodos(todos, visibilityFilter),
    completedCount: todos.length - activeTodoCount,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleTodo,
      clearCompleted,
      toggleAll,
      removeTodo,
      editTodo,
    },
    dispatch
  );

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoList
);

export default TodoListContainer;
