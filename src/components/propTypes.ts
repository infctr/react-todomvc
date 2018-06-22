import PropTypes from 'prop-types';

export const todoPropTypes = PropTypes.shape({
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

export default todoPropTypes;
