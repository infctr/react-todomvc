import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { bindActionCreators } from 'redux';

import { setVisibilityFilter } from 'redux/modules/visibilityFilter';
import { RootState } from 'redux/configureStore';
import { VisibilityFilters } from 'types/models';

import styles from './index.module.scss';

const VisibilityFilterCaptions = {
  [VisibilityFilters[VisibilityFilters.SHOW_ALL]]: 'All',
  [VisibilityFilters[VisibilityFilters.SHOW_ACTIVE]]: 'Active',
  [VisibilityFilters[VisibilityFilters.SHOW_COMPLETED]]: 'Completed',
};

const actionCreators = { setVisibilityFilter };

type IDispatchProps = typeof actionCreators;

interface IStateProps {
  active: boolean;
  text: string;
}

interface IOwnProps {
  filter: number;
}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

const FilterLink: React.SFC<IProps> = ({ text, active, filter, ...props }) => (
  <li>
    <button
      type="button"
      className={cn(styles.button, active && styles.selected)}
      onClick={() => props.setVisibilityFilter(filter)}>
      {text}
    </button>
  </li>
);

export default connect(
  ({ visibilityFilter }: RootState, ownProps: IOwnProps) => ({
    active: ownProps.filter === visibilityFilter,
    text: VisibilityFilterCaptions[VisibilityFilters[ownProps.filter]],
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FilterLink);
