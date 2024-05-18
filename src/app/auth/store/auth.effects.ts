import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { catchError, of, switchMap, tap } from 'rxjs';
import { LoginService } from '../services/login.service';
import { map } from 'rxjs/operators';
import { setNotification } from '../../store/notifications.actions';

export const login = createEffect(
  (actions$ = inject(Actions), loginService = inject(LoginService)) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ emailOrUsername, password, returnUrl }) =>
        loginService.login(emailOrUsername, password).pipe(
          map((user) => AuthActions.loginSuccess({ user, returnUrl })),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const loginSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user }) => localStorage.setItem('user', JSON.stringify(user))),
      tap(({ user, returnUrl }) => router.navigateByUrl(returnUrl)),
      map(({ user }) =>
        setNotification({
          message: `Welcome back, ${user.name}!`,
          error: false,
          delay: 5000,
        }),
      ),
    );
  },
  { functional: true },
);
