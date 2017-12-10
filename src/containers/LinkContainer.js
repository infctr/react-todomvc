import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions/index';
import Link from '../components/Link';

const VisibilityFilterCaptions = {
  SHOW_ALL: 'All',
  SHOW_COMPLETED: 'Completed',
  SHOW_ACTIVE: 'Active',
};

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
  text: VisibilityFilterCaptions[ownProps.filter],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});

const LinkContainer = connect(mapStateToProps, mapDispatchToProps)(Link);

export default LinkContainer;
