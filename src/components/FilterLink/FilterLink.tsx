import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { bindActionCreators } from 'redux';

import { setVisibilityFilter } from '../../redux/modules/visibilityFilter';
import { RootState } from '../../redux/configureStore';
import { VisibilityFilters } from '../../types/models';
import { getVisibilityFilter } from '../../selectors/visibilityFilter';

import styles from './FilterLink.module.scss';

const VisibilityFilterCaptions = {
  [VisibilityFilters.SHOW_ALL]: 'All',
  [VisibilityFilters.SHOW_ACTIVE]: 'Active',
  [VisibilityFilters.SHOW_COMPLETED]: 'Completed',
};

const actionCreators = { setVisibilityFilter };

type IDispatchProps = typeof actionCreators;

interface IStateProps {
  visibilityFilter: VisibilityFilters;
}

interface IOwnProps {
  filter: VisibilityFilters;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

const FilterLink: React.SFC<IProps> = ({
  visibilityFilter,
  filter,
  ...props
}) => {
  const text = VisibilityFilterCaptions[filter];
  const isActive = visibilityFilter === filter;

  return (
    <li>
      <button
        type="button"
        className={cn(styles.button, isActive && styles.selected)}
        onClick={() => props.setVisibilityFilter(filter)}>
        {text}
      </button>
    </li>
  );
};

export default connect<IStateProps, IDispatchProps, IOwnProps, RootState>(
  state => ({
    visibilityFilter: getVisibilityFilter(state),
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FilterLink);
