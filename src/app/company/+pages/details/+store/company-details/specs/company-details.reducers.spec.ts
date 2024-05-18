import { describe, expect, test } from 'vitest';
import * as CompanyDetailsActions from '../company-details.actions';
import { companyDetailsReducer } from '../company-details.reducers';
import { CompanyDetailsState, initialState } from '../company-details.state';
import { CompanySearchItem } from '../../../../../models/company-search';

describe('companyDetailsReducer', () => {
  test('should return the initial state', () => {
    const action = { type: 'unknown' };
    const state = companyDetailsReducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  test('should handle viewCompanyDetails', () => {
    const companyNumber = '12345';
    const action = CompanyDetailsActions.viewCompanyDetails({ companyNumber });
    const expectedState: CompanyDetailsState = {
      ...initialState,
      latest: null,
      loading: true,
      error: null,
    };

    const state = companyDetailsReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle viewCompanyDetailsSuccess', () => {
    const company = { name: 'Test Company' } as unknown as CompanySearchItem;
    const action = CompanyDetailsActions.viewCompanyDetailsSuccess({ company });
    const expectedState: CompanyDetailsState = {
      ...initialState,
      latest: company,
    };

    const state = companyDetailsReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle viewCompanyDetailsFailure', () => {
    const error = 'Error message';
    const action = CompanyDetailsActions.viewCompanyDetailsFailure({
      companyNumber: 'blah',
      error,
    });
    const expectedState: CompanyDetailsState = {
      ...initialState,
      error,
    };

    const state = companyDetailsReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle clearCompanyDetails', () => {
    const populatedState: CompanyDetailsState = {
      latest: { name: 'Test Company' } as unknown as CompanySearchItem,
      loading: false,
      error: 'Error message',
    };
    const action = CompanyDetailsActions.clearCompanyDetails();
    const state = companyDetailsReducer(populatedState, action);

    expect(state).toEqual(initialState);
  });
});
