import { connect } from 'react-redux';
import { toggleTodo, clearCompleted } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
  }
};

const mapStateToProps = ({ todos, visibilityFilter }) => {
  const activeTodoCount = todos.reduce(function(accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);

  return {
    todos: getVisibleTodos(todos, visibilityFilter),
    activeTodoCount: activeTodoCount,
    completedCount: todos.length - activeTodoCount,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleToggle: id => {
      dispatch(toggleTodo(id));
    },
    clearCompleted: () => {
      dispatch(clearCompleted());
    },
  };
};

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoList
);

export default TodoListContainer;
