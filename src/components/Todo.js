import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import codeKeys from '../constants/codeKeys';
import PropTypes from 'prop-types';

export default class Todo extends PureComponent {
  static propTypes = {
    handleToggle: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    todo: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.bool.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
    editing: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editText: props.todo.title,
    };
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      const node = ReactDOM.findDOMNode(this.refs.editField);

      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  handleSubmit = () => {
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

  render() {
    const { todo, editing, handleToggle, onRemove } = this.props;

    return (
      <li
        className={classNames({
          editing,
          completed: todo.completed,
        })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <div onDoubleClick={this.handleEdit}>{todo.title}</div>
          <button className="destroy" onClick={onRemove} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}
