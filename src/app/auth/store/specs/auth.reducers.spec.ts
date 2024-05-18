import { describe, expect, test } from 'vitest';
import { authReducer } from '../auth.reducers';
import * as AuthActions from '../auth.actions';
import { AuthState, initialState } from '../auth.state';

describe('authReducer', () => {
  test('should return the initial state', () => {
    const action = { type: 'unknown' };
    const state = authReducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  test('should handle login', () => {
    const action = AuthActions.login({
      emailOrUsername: 'john',
      password: '1234',
      returnUrl: '/',
    });
    const expectedState: AuthState = {
      ...initialState,
      error: null,
      loading: true,
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle loginSuccess', () => {
    const user = { name: 'John Doe' };
    const action = AuthActions.loginSuccess({ user, returnUrl: '/' });
    const expectedState: AuthState = {
      user,
      error: null,
      loading: false,
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle loginFailure', () => {
    const error = 'Invalid credentials';
    const action = AuthActions.loginFailure({ error });
    const expectedState: AuthState = {
      ...initialState,
      error,
      loading: false,
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle logout', () => {
    const action = AuthActions.logout();
    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
