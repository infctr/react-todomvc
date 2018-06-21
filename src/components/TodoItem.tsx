import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { CodeKeys } from '../constants/codeKeys';
import { todoPropTypes } from './propTypes';
import { Todo } from '../types/models';

interface TodoItemProps {
  editing: boolean;
  handleToggle: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onRemove: () => void;
  onSave: (s: string) => void;
  todo: Todo;
}

interface TodoItemState {
  editText: string;
}

export default class TodoItem extends PureComponent<
  TodoItemProps,
  TodoItemState
> {
  public static propTypes = {
    editing: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    todo: todoPropTypes.isRequired,
  };

  constructor(props: TodoItemProps) {
    super(props);

    this.state = {
      editText: props.todo.title,
    };
  }

  private editFieldRef: React.RefObject<HTMLInputElement> = React.createRef();

  public componentDidUpdate(prevProps: TodoItemProps) {
    if (!prevProps.editing && this.props.editing) {
      const node = this.editFieldRef.current;

      if (node) {
        node.focus();
        node.setSelectionRange(0, node.value.length);
      }
    }
  }

  private handleSubmit = () => {
    const val = this.state.editText.trim();

    if (val) {
      this.props.onSave(val);
      this.setState({ editText: val });
    } else {
      this.props.onRemove();
    }
  };

  private handleEdit = () =>
    this.setState({ editText: this.props.todo.title }, () =>
      this.props.onEdit()
    );

  private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which === CodeKeys.ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });

      this.props.onCancel();
    } else if (event.which === CodeKeys.ENTER_KEY) {
      this.handleSubmit();
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.editing && this.setState({ editText: event.target.value });

  public render() {
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
