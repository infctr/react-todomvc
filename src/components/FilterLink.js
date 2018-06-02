import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { bindActionCreators } from 'redux';

import { setVisibilityFilter } from '../actions/index';

const VisibilityFilterCaptions = {
  SHOW_ACTIVE: 'Active',
  SHOW_ALL: 'All',
  SHOW_COMPLETED: 'Completed',
};

const Link = ({ text, active, filter, ...props }) => (
  <li>
    <button
      className={cn({ selected: active })}
      onClick={() => props.setVisibilityFilter(filter)}>
      {text}
    </button>
  </li>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  setVisibilityFilter: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default connect(
  (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter,
    text: VisibilityFilterCaptions[ownProps.filter],
  }),
  dispatch => bindActionCreators({ setVisibilityFilter }, dispatch)
)(Link);
