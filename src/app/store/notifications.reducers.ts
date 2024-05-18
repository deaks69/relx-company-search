import { Action, createReducer, on } from '@ngrx/store';
import { initialState, NotificationsState } from './notifications.state';
import { clearNotification, setNotification } from './notifications.actions';

const reducer = createReducer(
  initialState,
  on(setNotification, (state, { message, error, delay }) => ({
    ...state,
    message,
    error,
    delay,
  })),
  on(clearNotification, (state) => ({
    message: null,
    error: false,
    delay: null,
  })),
);

export function notificationsReducer(
  state: NotificationsState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
