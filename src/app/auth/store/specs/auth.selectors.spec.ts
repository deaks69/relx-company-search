import { describe, expect, test } from 'vitest';
import { authState, isLoggingIn } from '../auth.selectors';
import { AuthState } from '../auth.state';

describe('Auth Selectors', () => {
  const initialState: AuthState = {
    user: null,
    error: null,
    loading: false,
  };

  const loggingInState: AuthState = {
    user: null,
    error: null,
    loading: true,
  };

  test('authState should select the auth state', () => {
    const result = authState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  test('isLoggingIn should select the loading state', () => {
    const result = isLoggingIn.projector(loggingInState);
    expect(result).toEqual(true);

    const resultInitialState = isLoggingIn.projector(initialState);
    expect(resultInitialState).toEqual(false);
  });
});
