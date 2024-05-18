import { Action, createReducer, on } from '@ngrx/store';
import * as CompanySearchActions from './company-search.actions';
import { CompanySearchState, initialState } from './company-search.state';

const reducer = createReducer(
  initialState,
  on(CompanySearchActions.search, (state, { search }) => ({
    ...state,
    loading: true,
    search,
  })),
  on(CompanySearchActions.searchSuccess, (state, { companies }) => ({
    ...state,
    latest: companies,
    error: null,
    loading: false,
  })),
  on(CompanySearchActions.searchFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(CompanySearchActions.setSelectedPage, (state, { page, itemsPerPage }) => ({
    ...state,
    selectedPage: page,
    itemsPerPage,
  })),
);

export function companySearchReducer(
  state: CompanySearchState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
