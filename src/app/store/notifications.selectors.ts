import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationsState } from './notifications.state';

export const selectNotificationState =
  createFeatureSelector<NotificationsState>('notifications');

export const selectNotification = createSelector(
  selectNotificationState,
  (state) => state,
);
