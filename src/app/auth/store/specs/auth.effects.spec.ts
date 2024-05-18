import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Router } from '@angular/router';
import * as AuthActions from '../auth.actions';
import { login, loginSuccess } from '../auth.effects';
import { LoginService } from '../../services/login.service';
import { setNotification } from '../../../store/notifications.actions';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let loginService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: LoginService,
          useValue: {
            login: vi.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: vi.fn(),
          },
        },
      ],
    });

    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  describe('login', () => {
    test('should dispatch loginSuccess on successful login', () => {
      const user = { name: 'John Doe' };
      const returnUrl = '/dashboard';
      const action = AuthActions.login({
        emailOrUsername: 'john',
        password: '1234',
        returnUrl,
      });
      const successAction = AuthActions.loginSuccess({ user, returnUrl });

      actions$ = of(action);
      vi.spyOn(loginService, 'login').mockReturnValue(
        of(
          user as unknown as {
            name: string;
            email: string;
            id: number;
            token: string;
          },
        ),
      );

      const effect = TestBed.runInInjectionContext(() => login());

      effect.subscribe((result) => {
        expect(result).toEqual(successAction);
      });
    });

    test('should dispatch loginFailure on login error', () => {
      const error = { message: 'Invalid credentials' };
      const action = AuthActions.login({
        emailOrUsername: 'john',
        password: '1234',
        returnUrl: '/dashboard',
      });
      const failureAction = AuthActions.loginFailure({ error: error.message });

      actions$ = of(action);
      vi.spyOn(loginService, 'login').mockReturnValue(throwError(() => error));

      const effect = TestBed.runInInjectionContext(() => login());

      effect.subscribe((result) => {
        expect(result).toEqual(failureAction);
      });
    });
  });

  describe('loginSuccess', () => {
    test('should store user in localStorage and navigate to returnUrl', () => {
      const user = { name: 'John Doe' };
      const returnUrl = '/dashboard';
      const action = AuthActions.loginSuccess({ user, returnUrl });
      const notificationAction = setNotification({
        message: `Welcome back, ${user.name}!`,
        error: false,
        delay: 5000,
      });

      actions$ = of(action);

      const effect = TestBed.runInInjectionContext(() => loginSuccess());

      effect.subscribe((result) => {
        expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));
        expect(router.navigateByUrl).toHaveBeenCalledWith(returnUrl);
        expect(result).toEqual(notificationAction);
      });
    });
  });
});
