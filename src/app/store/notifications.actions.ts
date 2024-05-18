import { createAction, props } from '@ngrx/store';

export const setNotification = createAction(
  '[Notifications] Set Notification',
  props<{ message: string; error: boolean; delay?: number }>(),
);

export const clearNotification = createAction(
  '[Notifications] Clear Notification',
);
