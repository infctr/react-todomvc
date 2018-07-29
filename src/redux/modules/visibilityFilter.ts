import { action as actionCreator, ActionType } from 'typesafe-actions';

import { VisibilityFilters } from 'types/models';

const SET_VISIBILITY_FILTER = 'filter/SET_VISIBILITY_FILTER';

export const setVisibilityFilter = (filter: VisibilityFilters) =>
  actionCreator(SET_VISIBILITY_FILTER, filter);

type VisibilityFilterActions = ActionType<typeof setVisibilityFilter>;
type VisibilityFilterState = VisibilityFilters;

export default function reducer(
  state: VisibilityFilterState = VisibilityFilters.SHOW_ALL,
  { type, payload }: VisibilityFilterActions
): VisibilityFilterState {
  switch (type) {
    case SET_VISIBILITY_FILTER:
      return payload;

    default:
      return state;
  }
}
