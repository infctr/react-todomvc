import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import codeKeys from '../constants/codeKeys';
import PropTypes from 'prop-types';

export default class Todo extends React.Component {
  static propTypes = {
    handleToggle: PropTypes.func.isRequired,
    //   onSave: PropTypes.func.isRequired,
    //   onRemove: PropTypes.func.isRequired,
    //   onEdit: PropTypes.func.isRequired,
    //   onCancel: PropTypes.func.isRequired,
    //   todo: PropTypes.object.isRequired,
    //   editing: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    console.log('props', props);

    this.state = {
      editText: props.todo.title,
    };
  }

  handleSubmit = event => {
    const val = this.state.editText.trim();

    if (val) {
      this.props.onSave(val);
      this.setState({ editText: val });
    } else {
      this.props.onRemove();
    }
  };

  handleEdit = () => {
    this.props.onEdit();

    this.setState({ editText: this.props.todo.title });
  };

  handleKeyDown = event => {
    if (event.which === codeKeys.ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });

      this.props.onCancel(event);
    } else if (event.which === codeKeys.ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  handleChange = event => {
    if (this.props.editing) {
      this.setState({ editText: event.target.value });
    }
  };

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = ReactDOM.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  render() {
    const { todo, editing, handleToggle, onRemove } = this.props;

    //                    <label onDoubleClick={this.handleEdit}>{todo.title}</label>
    //                    <button className="destroy" onClick={onRemove} />
    //                <input
    //                          ref="editField"
    //                  className="edit"
    //                  value={this.state.editText}
    //                  onBlur={this.handleSubmit}
    //                  onChange={this.handleChange}
    //                  onKeyDown={this.handleKeyDown}
    //               />
    return (
      <li
        className={classNames({
          completed: todo.completed,
          // editing: editing,
        })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <label>{todo.title}</label>
        </div>
      </li>
    );
  }
}
