import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { clearNotification, setNotification } from '../notifications.actions';
import { setNotification$ } from '../notifications.effects';
import { beforeEach, describe, expect, test } from 'vitest';
import { provideMockStore } from '@ngrx/store/testing';

describe('NotificationsEffects', () => {
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions$), provideMockStore()],
    });
  });

  test('should dispatch clearNotification', () => {
    const action = setNotification({
      message: 'Test notification',
      error: false,
    });
    actions$ = of(action);

    const effect = TestBed.runInInjectionContext(() => setNotification$());

    effect.subscribe((result: any) => {
      expect(result).toEqual(clearNotification());
    });
  });
});
