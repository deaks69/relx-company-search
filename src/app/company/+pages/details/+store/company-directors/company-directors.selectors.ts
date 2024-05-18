import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyDirectorsState } from './company-directors.state';

export const selectCompanyDirectors =
  createFeatureSelector<CompanyDirectorsState>('companyDirectors');

export const selectCompanyDirectorsLatest = createSelector(
  selectCompanyDirectors,
  (state) => state?.latest,
);

export const selectCompanyDirectorsLoading = createSelector(
  selectCompanyDirectors,
  (state) => state.loading,
);

export const selectCompanyDirectorsError = createSelector(
  selectCompanyDirectors,
  (state) => state.error,
);
