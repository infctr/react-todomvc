import React from 'react';
import { pluralize } from '../utils/index';
import { VisibilityFilters } from '../constants/actionTypes';
import LinkContainer from '../containers/LinkContainer';

const Footer = ({
  count,
  completedCount,
  visibilityFilter,
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
        {Object.values(VisibilityFilters).map(filter => (
          <LinkContainer key={filter} filter={filter} />
        ))}
      </ul>
      {clearButton}
    </footer>
  );
};

export default Footer;
