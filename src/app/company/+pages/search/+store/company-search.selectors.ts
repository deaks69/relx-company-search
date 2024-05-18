import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanySearchState } from './company-search.state';
import { CompanySearchItem } from '../../../models/company-search';

export const selectCompanySearchState =
  createFeatureSelector<CompanySearchState>('companySearch');

export const selectSearch = createSelector(
  selectCompanySearchState,
  (state) => state.search,
);

export const selectLatestCompanySearchResults = createSelector(
  selectCompanySearchState,
  (state) => state?.latest,
);

export const selectLatestCompanySearchItems = createSelector(
  selectLatestCompanySearchResults,
  (state) => state?.items || [],
);

export const selectSelectedPage = createSelector(
  selectCompanySearchState,
  (state: CompanySearchState) => state?.selectedPage || 1,
);

export const selectItemsPerPage = createSelector(
  selectCompanySearchState,
  (state: CompanySearchState) => state?.itemsPerPage || 10,
);

const getPaginatedItems = (
  items: CompanySearchItem[],
  selectedPage: number,
  itemsPerPage: number,
) =>
  items.slice((selectedPage - 1) * itemsPerPage, selectedPage * itemsPerPage);

export const selectLatestCompanySearchResultPaged = createSelector(
  selectLatestCompanySearchItems,
  selectSelectedPage,
  selectItemsPerPage,
  getPaginatedItems,
);

export const selectCompanySearchError = createSelector(
  selectCompanySearchState,
  (state) => state.error,
);

export const selectCompanySearchLoading = createSelector(
  selectCompanySearchState,
  (state) => state.loading,
);

export const companySearchVm = createSelector(
  selectLatestCompanySearchResults,
  selectLatestCompanySearchResultPaged,
  selectSelectedPage,
  selectItemsPerPage,
  (allResults, pagedResults, page, itemsPerPage) => ({
    allResults,
    pagedResults,
    page,
    itemsPerPage,
  }),
);
