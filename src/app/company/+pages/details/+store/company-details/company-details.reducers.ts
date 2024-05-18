import { Action, createReducer, on } from '@ngrx/store';
import { CompanyDetailsState, initialState } from './company-details.state';
import * as CompanyDetailsActions from './company-details.actions';

const reducer = createReducer(
  initialState,
  on(CompanyDetailsActions.viewCompanyDetails, (state) => ({
    ...state,
    latest: null,
    loading: true,
  })),
  on(CompanyDetailsActions.viewCompanyDetailsSuccess, (state, { company }) => ({
    ...state,
    latest: company,
    loading: false,
  })),
  on(CompanyDetailsActions.viewCompanyDetailsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(CompanyDetailsActions.clearCompanyDetails, () => initialState),
);

export const companyDetailsReducer = (
  state: CompanyDetailsState | undefined,
  action: Action,
) => reducer(state, action);
