import React from 'react';
import classNames from 'classnames';
import { pluralize } from '../utils/index.js';
import itemTypes from '../constants/itemTypes';

const Footer = ({
  count,
  completedCount,
  nowShowing,
  onClearCompleted = () => {},
}) => {
  var activeTodoWord = pluralize(count, 'item');
  var clearButton = null;

  if (completedCount > 0) {
    clearButton = (
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    );
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: nowShowing === itemTypes.ALL_TODOS,
            })}>
            All
          </a>
        </li>{' '}
        <li>
          <a
            href="#/active"
            className={classNames({
              selected: nowShowing === itemTypes.ACTIVE_TODOS,
            })}>
            Active
          </a>
        </li>{' '}
        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: nowShowing === itemTypes.COMPLETED_TODOS,
            })}>
            Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
};

export default Footer;
