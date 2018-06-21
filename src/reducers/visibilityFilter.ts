import { ActionType } from 'typesafe-actions';

import { visibilityFilter as visibilityFilterActions } from '../actions';
import { VisibilityFilters } from '../types/models';
import { SET_VISIBILITY_FILTER } from '../constants/actionTypes';

export type VisibilityFilterAction = ActionType<typeof visibilityFilterActions>;
export type VisibilityFilterState = VisibilityFilters;

const visibilityFilter = (
  state: VisibilityFilterState = VisibilityFilters.SHOW_ALL,
  { type, payload }: VisibilityFilterAction
) => {
  switch (type) {
    case SET_VISIBILITY_FILTER:
      return payload;

    default:
      return state;
  }
};

export default visibilityFilter;
