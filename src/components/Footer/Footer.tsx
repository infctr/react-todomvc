import React from 'react';
import noop from 'lodash/noop';

import { pluralize } from '../../utils/pluralize';
import { VisibilityFilters } from '../../types/models';

import { FilterLink } from '../FilterLink';

import styles from './Footer.module.scss';

interface IDefaultProps {
  onClearCompleted: () => void;
}

interface IProps extends IDefaultProps {
  count: number;
  completedCount: number;
}

const Footer: React.SFC<IProps> = ({
  count,
  completedCount,
  onClearCompleted,
}) => {
  const activeTodoWord = pluralize(count, 'item');

  const clearButton = completedCount > 0 && (
    <button type="button" className={styles.clear} onClick={onClearCompleted}>
      Clear completed
    </button>
  );

  return (
    <footer className={styles.footer}>
      <span className={styles.count}>
        <strong>{count}</strong> {activeTodoWord} left
      </span>
      <ul className={styles.filters}>
        {Object.keys(VisibilityFilters).map(filter => (
          <FilterLink key={filter} filter={filter as VisibilityFilters} />
        ))}
      </ul>
      {clearButton}
    </footer>
  );
};

// eslint-disable-next-line fp/no-mutation
Footer.defaultProps = {
  onClearCompleted: noop,
};

export default Footer;
