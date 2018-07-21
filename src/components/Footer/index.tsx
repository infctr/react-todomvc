import React, { PureComponent } from 'react';
import noop from 'lodash/noop';

import { pluralize } from 'utils';
import { VisibilityFilters } from 'types/models';
import FilterLink from 'components/FilterLink';

import styles from './index.module.scss';

export interface IProps {
  count: number;
  completedCount: number;
  onClearCompleted?: () => void;
}

interface IDefaultProps extends Partial<IProps> {
  onClearCompleted: () => void;
}

class Footer extends PureComponent<IProps> {
  public static defaultProps: IDefaultProps = {
    onClearCompleted: noop,
  };

  public render() {
    const { count, completedCount, onClearCompleted } = this.props;

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
