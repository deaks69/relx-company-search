import { describe, expect, test } from 'vitest';
import { CompanyDetailsState } from '../company-details.state';
import {
  selectCompanyDetails,
  selectCompanyDetailsError,
  selectCompanyDetailsLoading,
  selectCompanyDetailsState,
  selectCompanyDetailsVm,
} from '../company-details.selectors';
import { CompanySearchItem } from '../../../../../models/company-search';

describe('CompanyDetails Selectors', () => {
  const initialState: CompanyDetailsState = {
    latest: null,
    loading: false,
    error: null,
  };

  const populatedState: CompanyDetailsState = {
    latest: { name: 'Test Company' } as unknown as CompanySearchItem,
    loading: true,
    error: 'Error message',
  };

  test('selectCompanyDetailsState should select the company details state', () => {
    const result = selectCompanyDetailsState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  test('selectCompanyDetails should select the latest company details', () => {
    const result = selectCompanyDetails.projector(populatedState);
    expect(result).toEqual(populatedState.latest);
  });

  test('selectCompanyDetailsLoading should select the loading state', () => {
    const result = selectCompanyDetailsLoading.projector(populatedState);
    expect(result).toEqual(populatedState.loading);
  });

  test('selectCompanyDetailsError should select the error state', () => {
    const result = selectCompanyDetailsError.projector(populatedState);
    expect(result).toEqual(populatedState.error);
  });

  test('selectCompanyDetailsVm should select the view model', () => {
    const result = selectCompanyDetailsVm.projector(
      populatedState.latest,
      populatedState.loading,
      populatedState.error,
    );
    expect(result).toEqual({
      company: populatedState.latest,
      loading: populatedState.loading,
      error: populatedState.error,
    });
  });
});
