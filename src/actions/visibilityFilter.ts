import { action } from 'typesafe-actions';

import { SET_VISIBILITY_FILTER } from '../constants/actionTypes';

export const setVisibilityFilter = (filter: number) =>
  action(SET_VISIBILITY_FILTER, filter);

export default setVisibilityFilter;
