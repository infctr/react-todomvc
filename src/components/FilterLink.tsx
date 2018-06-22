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

interface FilterLinkProps {
  active: boolean;
  filter: number;
  setVisibilityFilter: typeof setVisibilityFilter;
  text: string;
}

const FilterLink: React.SFC<FilterLinkProps> = ({
  text,
  active,
  filter,
  ...props
}) => (
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

interface FilterLinkOwnProps {
  filter: number;
}

export default connect(
  ({ visibilityFilter }: RootState, ownProps: FilterLinkOwnProps) => ({
    active: ownProps.filter === visibilityFilter,
    text: VisibilityFilterCaptions[VisibilityFilters[ownProps.filter]],
  }),
  dispatch => bindActionCreators({ setVisibilityFilter }, dispatch)
)(FilterLink);
