import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ emailOrUsername: string; password: string; returnUrl: string }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; returnUrl: string }>(),
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Auth] Logout');
