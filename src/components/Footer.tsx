import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { pluralize } from '../utils';
import { VisibilityFilters } from '../types/models';
import FilterLink from './FilterLink';

export interface FooterProps {
  count: number;
  completedCount: number;
  onClearCompleted?: () => void;
}

interface FooterDefaultProps {
  onClearCompleted: () => void;
}

class Footer extends PureComponent<FooterProps> {
  public static propTypes = {
    completedCount: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onClearCompleted: PropTypes.func,
  };

  public static defaultProps: FooterDefaultProps = {
    onClearCompleted: noop,
  };

  public render() {
    const { count, completedCount, onClearCompleted } = this.props;

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
  }
}

export default Footer;
