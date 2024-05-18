import { describe, expect, test } from 'vitest';
import { notificationsReducer } from '../notifications.reducers';
import { clearNotification, setNotification } from '../notifications.actions';
import { NotificationsState } from '../notifications.state';

describe('NotificationsReducer', () => {
  const initialState: NotificationsState = {
    message: null,
    error: false,
    delay: null,
  };

  test('should return the initial state', () => {
    const action = { type: 'unknown' } as any;
    const state = notificationsReducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  test('should handle setNotification action', () => {
    const message = 'Test notification';
    const error = true;
    const delay = 3000;
    const action = setNotification({ message, error, delay });
    const expectedState: NotificationsState = {
      message,
      error,
      delay,
    };

    const state = notificationsReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test('should handle clearNotification action', () => {
    const action = clearNotification();
    const modifiedState: NotificationsState = {
      message: 'Some message',
      error: true,
      delay: 3000,
    };

    const expectedState: NotificationsState = {
      message: null,
      error: false,
      delay: null,
    };

    const state = notificationsReducer(modifiedState, action);

    expect(state).toEqual(expectedState);
  });
});
