import { connect } from 'react-redux';
import { setNewTodo, addTodo } from '../actions/index';
import codeKeys from '../constants/codeKeys';
import AddTodo from '../components/AddTodo';

const mapStateToProps = state => {
  return {
    value: state.newTodo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleKeyDown: event => {
      if (event.keyCode !== codeKeys.ENTER_KEY) {
        return;
      }

      event.preventDefault();

      const val = event.target.value.trim();

      if (val) {
        dispatch(addTodo(val));
        dispatch(setNewTodo(''));
      }
    },

    handleChange: event => {
      dispatch(setNewTodo(event.target.value));
    },
  };
};

const AddTodoContainer = connect(mapStateToProps, mapDispatchToProps)(AddTodo);

export default AddTodoContainer;
