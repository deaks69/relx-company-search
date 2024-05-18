import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyDetailsState } from './company-details.state';

export const selectCompanyDetailsState =
  createFeatureSelector<CompanyDetailsState>('companyDetails');

export const selectCompanyDetails = createSelector(
  selectCompanyDetailsState,
  (state) => state?.latest,
);

export const selectCompanyDetailsLoading = createSelector(
  selectCompanyDetailsState,
  (state) => state.loading,
);

export const selectCompanyDetailsError = createSelector(
  selectCompanyDetailsState,
  (state) => state.error,
);

export const selectCompanyDetailsVm = createSelector(
  selectCompanyDetails,
  selectCompanyDetailsLoading,
  selectCompanyDetailsError,
  (company, loading, error) => ({ company, loading, error }),
);
