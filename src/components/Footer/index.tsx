import React, { PureComponent } from 'react';
import noop from 'lodash/noop';

import { pluralize } from 'utils';
import { VisibilityFilters } from 'types/models';

import FilterLink from 'components/FilterLink';

import styles from './index.module.scss';

interface IDefaultProps {
  onClearCompleted: () => void;
}

interface IProps extends Partial<IDefaultProps> {
  count: number;
  completedCount: number;
  onClearCompleted?: () => void;
}

type IPropsWithDefault = IProps & IDefaultProps;

class Footer extends PureComponent<IPropsWithDefault> {
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
          {Object.keys(VisibilityFilters).map((filter: VisibilityFilters) => (
            <FilterLink key={filter} filter={filter} />
          ))}
        </ul>
        {clearButton}
      </footer>
    );
  }
}

export default Footer as React.ComponentClass<IProps>;
