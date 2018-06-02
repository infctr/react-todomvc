import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { pluralize } from '../utils';
import { VisibilityFilters } from '../constants/actionTypes';
import FilterLink from './FilterLink';

const Footer = ({ count, completedCount, onClearCompleted }) => {
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
          <FilterLink key={filter} filter={filter} />
        ))}
      </ul>
      {clearButton}
    </footer>
  );
};

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func,
};

Footer.defaultProps = {
  onClearCompleted: noop,
};

export default Footer;
