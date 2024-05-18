import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { clearNotification, setNotification } from './notifications.actions';
import { map } from 'rxjs/operators';

export const setNotification$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(setNotification),
      map(() => clearNotification()),
    ),
  { functional: true },
);
