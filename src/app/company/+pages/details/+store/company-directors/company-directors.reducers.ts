import { Action, createReducer, on } from '@ngrx/store';
import { CompanyDirectorsState, initialState } from './company-directors.state';
import * as CompanyDirectorsActions from './company-directors.actions';

const reducer = createReducer(
  initialState,
  on(CompanyDirectorsActions.getCompanyDirectors, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    CompanyDirectorsActions.getCompanyDirectorsSuccess,
    (state, { directors }) => ({
      ...state,
      latest: directors,
      loading: false,
      error: null,
    }),
  ),
  on(
    CompanyDirectorsActions.getCompanyDirectorsFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  on(CompanyDirectorsActions.clearCompanyDirectors, () => initialState),
);

export function companyDirectorsReducer(
  state: CompanyDirectorsState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
