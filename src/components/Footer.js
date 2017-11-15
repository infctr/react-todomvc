import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { pluralize } from '../utils/index.js';
import itemTypes from '../constants/itemTypes';

const Footer = ({
  count,
  completedCount,
  nowShowing,
  onClearCompleted = () => {},
}) => {
  let clearButton = null;
  const activeTodoWord = pluralize(count, 'item');

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
          <Link
            to="/"
            className={classNames({
              selected: nowShowing === itemTypes.ALL_TODOS,
            })}>
            All
          </Link>
        </li>{' '}
        <li>
          <Link
            to="/active"
            className={classNames({
              selected: nowShowing === itemTypes.ACTIVE_TODOS,
            })}>
            Active
          </Link>
        </li>{' '}
        <li>
          <Link
            to="/completed"
            className={classNames({
              selected: nowShowing === itemTypes.COMPLETED_TODOS,
            })}>
            Completed
          </Link>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
};

export default Footer;
