import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import codeKeys from '../constants/codeKeys';

export default class Todo extends PureComponent {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    todo: PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editText: props.todo.title,
    };

    this.editFieldRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      const node = this.editFieldRef.current;

      node.focus();
      node.setSelectionRange(0, node.value.length);
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

  handleEdit = () =>
    this.setState({ editText: this.props.todo.title }, () =>
      this.props.onEdit()
    );

  handleKeyDown = event => {
    if (event.which === codeKeys.ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });

      this.props.onCancel(event);
    } else if (event.which === codeKeys.ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  handleChange = ({ target: { value } }) =>
    this.props.editing && this.setState({ editText: value });

  render() {
    const { todo, editing, handleToggle, onRemove } = this.props;

    return (
      <li
        className={cn({
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
          <span onDoubleClick={this.handleEdit}>{todo.title}</span>
          <button className="destroy" onClick={onRemove} />
        </div>
        <input
          ref={this.editFieldRef}
          type="text"
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
