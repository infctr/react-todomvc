import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { pluralize } from '../utils';
import { VisibilityFilters } from '../types/models';
import FilterLink from './FilterLink';

export interface FooterProps {
  count: number;
  completedCount: number;
  onClearCompleted: () => void;
}

interface DefaultProps {
  readonly onClearCompleted: () => void;
}

const Footer: React.SFC<FooterProps & DefaultProps> = ({
  count,
  completedCount,
  onClearCompleted,
}) => {
  const activeTodoWord = pluralize(count, 'item');

  const clearButton = completedCount > 0 && (
    <button
      type="button"
      className="clear-completed"
      onClick={onClearCompleted}>
      Clear completed
    </button>
  );

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        {Object.keys(VisibilityFilters)
          .filter(key => !Number.isNaN(Number(key)))
          .map(key => <FilterLink key={key} filter={Number(key)} />)}
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
