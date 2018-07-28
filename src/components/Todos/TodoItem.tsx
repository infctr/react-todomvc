import React, { PureComponent } from 'react';
import cn from 'classnames';

import { CodeKeys } from 'constants/codeKeys';
import { ITodo } from 'types/models';

import styles from './TodoItem.module.scss';

interface IProps {
  editing: boolean;
  handleToggle: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onRemove: () => void;
  onSave: (s: string) => void;
  todo: Readonly<ITodo>;
}

interface IState {
  editText: string;
}

export default class TodoItem extends PureComponent<IProps, IState> {
  private editFieldRef: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props: IProps) {
    super(props);

    this.state = {
      editText: props.todo.title,
    };
  }

  public componentDidUpdate(prevProps: IProps) {
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
          [styles.item]: true,
          [styles.editing]: editing,
          [styles.completed]: todo.completed,
        })}>
        <div className={styles.view}>
          <input
            className={styles.toggle}
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <span onDoubleClick={this.handleEdit}>{todo.title}</span>
          <button type="button" className={styles.destroy} onClick={onRemove} />
        </div>
        <input
          ref={this.editFieldRef}
          type="text"
          className={styles.edit}
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}
