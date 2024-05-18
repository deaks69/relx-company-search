import { beforeEach, describe, expect, test } from 'vitest';
import { CompanySearchState } from '../company-search.state';
import {
  companySearchVm,
  selectCompanySearchError,
  selectCompanySearchLoading,
  selectItemsPerPage,
  selectLatestCompanySearchItems,
  selectLatestCompanySearchResultPaged,
  selectLatestCompanySearchResults,
  selectSearch,
  selectSelectedPage,
} from '../company-search.selectors';
import {
  CompanySearch,
  CompanySearchItem,
} from '../../../../models/company-search';

describe('CompanySearch Selectors', () => {
  let initialState: CompanySearchState;
  let companies: CompanySearchItem[];

  beforeEach(() => {
    companies = [
      { name: 'Company A' } as unknown as CompanySearchItem,
      { name: 'Company B' } as unknown as CompanySearchItem,
      { name: 'Company C' } as unknown as CompanySearchItem,
    ];

    initialState = {
      search: '',
      latest: {
        pageNumber: 1,
        kind: 'search#companies',
        items: companies as unknown as CompanySearchItem[],
        totalResults: companies.length,
      },
      error: null,
      loading: false,
      selectedPage: 1,
      itemsPerPage: 2,
    };
  });

  test('should select the search state', () => {
    const result = selectSearch.projector(initialState);
    expect(result).toEqual(initialState.search);
  });

  test('should select the latest company search results', () => {
    const result = selectLatestCompanySearchResults.projector(initialState);
    expect(result).toEqual(initialState.latest);
  });

  test('should select the latest company search items', () => {
    const result = selectLatestCompanySearchItems.projector(
      initialState.latest,
    );
    expect(result).toEqual(companies);
  });

  test('should select the selected page', () => {
    const result = selectSelectedPage.projector(initialState);
    expect(result).toEqual(initialState.selectedPage);
  });

  test('should select the items per page', () => {
    const result = selectItemsPerPage.projector(initialState);
    expect(result).toEqual(initialState.itemsPerPage);
  });

  test('should select paginated company search results', () => {
    const result = selectLatestCompanySearchResultPaged.projector(
      (initialState.latest as unknown as CompanySearch)
        .items as unknown as CompanySearchItem[],
      initialState.selectedPage,
      initialState.itemsPerPage,
    );
    expect(result).toEqual(companies.slice(0, 2));
  });

  test('should select the company search error', () => {
    const errorState = { ...initialState, error: 'An error occurred' };
    const result = selectCompanySearchError.projector(errorState);
    expect(result).toEqual(errorState.error);
  });

  test('should select the company search loading state', () => {
    const loadingState = { ...initialState, loading: true };
    const result = selectCompanySearchLoading.projector(loadingState);
    expect(result).toEqual(loadingState.loading);
  });

  test('should select the company search VM', () => {
    const result = companySearchVm.projector(
      initialState.latest,
      companies.slice(0, 2),
      initialState.selectedPage,
      initialState.itemsPerPage,
    );
    expect(result).toEqual({
      allResults: initialState.latest,
      pagedResults: companies.slice(0, 2),
      page: initialState.selectedPage,
      itemsPerPage: initialState.itemsPerPage,
    });
  });
});
