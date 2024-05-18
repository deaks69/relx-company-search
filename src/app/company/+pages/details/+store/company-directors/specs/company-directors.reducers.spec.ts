import { describe, expect, test } from 'vitest';
import { companyDirectorsReducer } from '../company-directors.reducers';
import * as CompanyDirectorsActions from '../company-directors.actions';
import {
  CompanyDirectorsState,
  initialState,
} from '../company-directors.state';
import { Director } from '../../../../../models/director';

describe('companyDirectorsReducer', () => {
  test('should return the initial state', () => {
    const action = { type: 'unknown' };
    const state = companyDirectorsReducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  test('should handle getCompanyDirectors', () => {
    const action = CompanyDirectorsActions.getCompanyDirectors({
      companyNumber: '12345',
    });
    const expectedState: CompanyDirectorsState = {
      ...initialState,
      loading: true,
      error: null,
    };

    const state = companyDirectorsReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle getCompanyDirectorsSuccess', () => {
    const directors = [{ name: 'John Doe' }] as unknown as Director;
    const action = CompanyDirectorsActions.getCompanyDirectorsSuccess({
      directors,
      companyNumber: '12345',
    });
    const expectedState: CompanyDirectorsState = {
      ...initialState,
      latest: directors,
      loading: false,
      error: null,
    };

    const state = companyDirectorsReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle getCompanyDirectorsFailure', () => {
    const error = 'Error message';
    const action = CompanyDirectorsActions.getCompanyDirectorsFailure({
      error,
      companyNumber: '12345',
    });
    const expectedState: CompanyDirectorsState = {
      ...initialState,
      loading: false,
      error,
    };

    const state = companyDirectorsReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle clearCompanyDirectors', () => {
    const populatedState: CompanyDirectorsState = {
      latest: [{ name: 'John Doe' }] as unknown as Director,
      loading: false,
      error: 'Error message',
    };
    const action = CompanyDirectorsActions.clearCompanyDirectors();
    const state = companyDirectorsReducer(populatedState, action);

    expect(state).toEqual(initialState);
  });
});
