import {
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
} from '../constants/actionTypes';
import { switchCase } from '../utils';

const { SHOW_ALL } = VisibilityFilters;

const visibilityFilter = (state = SHOW_ALL, action) =>
  switchCase({
    [SET_VISIBILITY_FILTER]: () => action.filter,
  })(() => state)(action.type)();

export default visibilityFilter;
