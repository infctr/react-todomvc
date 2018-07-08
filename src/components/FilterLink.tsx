import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { bindActionCreators } from 'redux';

import { setVisibilityFilter } from '../actions/visibilityFilter';
import { RootState } from '../reducers';
import { VisibilityFilters } from '../types/models';

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
      className={cn({ selected: active })}
      onClick={() => props.setVisibilityFilter(filter)}>
      {text}
    </button>
  </li>
);

FilterLink.propTypes = {
  active: PropTypes.bool.isRequired,
  filter: PropTypes.number.isRequired,
  setVisibilityFilter: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default connect(
  ({ visibilityFilter }: RootState, ownProps: IOwnProps) => ({
    active: ownProps.filter === visibilityFilter,
    text: VisibilityFilterCaptions[VisibilityFilters[ownProps.filter]],
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FilterLink);
