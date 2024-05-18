import { describe, expect, test } from 'vitest';
import { companySearchReducer } from '../company-search.reducers';
import * as CompanySearchActions from '../company-search.actions';
import { CompanySearchState, initialState } from '../company-search.state';
import { CompanySearch } from '../../../../models/company-search';

describe('CompanySearchReducer', () => {
  const companies = [{ name: 'Test Company' }] as unknown as CompanySearch;

  test('should return the initial state', () => {
    const action = { type: 'unknown' };
    const state = companySearchReducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  test('should handle search', () => {
    const search = 'test';
    const action = CompanySearchActions.search({ search });
    const expectedState: CompanySearchState = {
      ...initialState,
      loading: true,
      search,
    };

    const state = companySearchReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle searchSuccess', () => {
    const action = CompanySearchActions.searchSuccess({ companies });
    const expectedState: CompanySearchState = {
      ...initialState,
      latest: companies,
      error: null,
      loading: false,
    };

    const state = companySearchReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle searchFailure', () => {
    const error = 'Error message';
    const action = CompanySearchActions.searchFailure({ error });
    const expectedState: CompanySearchState = {
      ...initialState,
      error,
      loading: false,
    };

    const state = companySearchReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle setSelectedPage', () => {
    const page = 2;
    const itemsPerPage = 10;
    const action = CompanySearchActions.setSelectedPage({ page, itemsPerPage });
    const expectedState: CompanySearchState = {
      ...initialState,
      selectedPage: page,
      itemsPerPage,
    };

    const state = companySearchReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });
});
