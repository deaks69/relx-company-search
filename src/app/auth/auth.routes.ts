import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { authReducer } from './store/auth.reducers';
import { provideEffects } from '@ngrx/effects';
import * as AuthEffects from './store/auth.effects';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState({ name: 'auth', reducer: authReducer }),
      provideEffects(AuthEffects),
    ],
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
];
