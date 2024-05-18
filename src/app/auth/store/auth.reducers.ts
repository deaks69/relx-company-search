import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import * as AuthActions from './auth.actions';

const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    user,
    error: null,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AuthActions.logout, () => initialState),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
