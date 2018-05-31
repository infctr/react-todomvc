import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setVisibilityFilter } from '../actions/index';

const VisibilityFilterCaptions = {
  SHOW_ALL: 'All',
  SHOW_COMPLETED: 'Completed',
  SHOW_ACTIVE: 'Active',
};

const Link = ({ text, active, filter, ...props }) => (
  <li>
    <a
      className={classNames({ selected: active })}
      onClick={() => props.setVisibilityFilter(filter)}>
      {text}
    </a>
  </li>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  setVisibilityFilter: PropTypes.func.isRequired,
};

export default connect(
  (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter,
    text: VisibilityFilterCaptions[ownProps.filter],
  }),
  dispatch => bindActionCreators({ setVisibilityFilter }, dispatch)
)(Link);
