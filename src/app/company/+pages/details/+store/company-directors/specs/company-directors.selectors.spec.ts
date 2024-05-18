import { describe, expect, test } from 'vitest';
import {
  selectCompanyDirectors,
  selectCompanyDirectorsError,
  selectCompanyDirectorsLatest,
  selectCompanyDirectorsLoading,
} from '../company-directors.selectors';
import { CompanyDirectorsState } from '../company-directors.state';
import { Director } from '../../../../../models/director';

describe('CompanyDirectors Selectors', () => {
  const initialState: CompanyDirectorsState = {
    latest: null,
    loading: false,
    error: null,
  };

  const populatedState: CompanyDirectorsState = {
    latest: [{ name: 'John Doe' }] as unknown as Director,
    loading: true,
    error: 'Error message',
  };

  test('selectCompanyDirectors should select the company directors state', () => {
    const result = selectCompanyDirectors.projector(initialState);
    expect(result).toEqual(initialState);
  });

  test('selectCompanyDirectorsLatest should select the latest company directors', () => {
    const result = selectCompanyDirectorsLatest.projector(populatedState);
    expect(result).toEqual(populatedState.latest);
  });

  test('selectCompanyDirectorsLoading should select the loading state', () => {
    const result = selectCompanyDirectorsLoading.projector(populatedState);
    expect(result).toEqual(populatedState.loading);
  });

  test('selectCompanyDirectorsError should select the error state', () => {
    const result = selectCompanyDirectorsError.projector(populatedState);
    expect(result).toEqual(populatedState.error);
  });
});
