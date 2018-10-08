import { action as actionCreator, ActionType } from 'typesafe-actions';

import { VisibilityFilters } from 'types/models';
import { switchCase } from 'utils';

const SET_VISIBILITY_FILTER = 'filter/SET_VISIBILITY_FILTER';

export const setVisibilityFilter = (filter: VisibilityFilters) =>
  actionCreator(SET_VISIBILITY_FILTER, filter);

type IVisibilityFilterActions = ActionType<typeof setVisibilityFilter>;
type IVisibilityFilterState = VisibilityFilters;

export default function visibilityFilter(
  state: IVisibilityFilterState = VisibilityFilters.SHOW_ALL,
  action: IVisibilityFilterActions
): IVisibilityFilterState {
  const reducer = switchCase<IVisibilityFilterActions, IVisibilityFilterState>({
    [SET_VISIBILITY_FILTER]: (payload): IVisibilityFilterState => payload,
  })(() => state);

  return reducer(action.type)(action.payload);
}
