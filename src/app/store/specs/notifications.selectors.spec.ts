import { describe, expect, test } from 'vitest';
import {
  selectNotification,
  selectNotificationState,
} from '../notifications.selectors';
import { NotificationsState } from '../notifications.state';

describe('Notifications Selectors', () => {
  const initialState: NotificationsState = {
    message: 'Test message',
    error: false,
    delay: 3000,
  };

  test('selectNotificationState should return the notifications state', () => {
    const result = selectNotificationState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  test('selectNotification should return the full notification state', () => {
    const result = selectNotification.projector(initialState);
    expect(result).toEqual(initialState);
  });
});
