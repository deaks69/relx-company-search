import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const authState = createFeatureSelector<AuthState>('auth');

export const isLoggingIn = createSelector(authState, (state) => state?.loading);
