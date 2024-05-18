import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import * as CompanyDirectorActions from '../company-directors.actions';
import { DirectorSearchService } from '../../../../../services/director-search.service';
import {
  viewCompanyDetailsFailure,
  viewCompanyDirectors,
} from '../company-directors.effects';
import { Director } from '../../../../../models/director';
import { ViewCompanyError } from '../../../../../../auth/models/view-company-error';
import { setNotification } from '../../../../../../store/notifications.actions';

describe('CompanyDirectorsEffects', () => {
  let actions$: Observable<any>;
  let directorSearchService: DirectorSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: DirectorSearchService,
          useValue: {
            searchDirectors: vi.fn(),
          },
        },
      ],
    });

    directorSearchService = TestBed.inject(DirectorSearchService);
  });

  describe('viewCompanyDirectors', () => {
    test('should dispatch getCompanyDirectorsSuccess on success', () => {
      const companyNumber = '12345';
      const directors = {} as unknown as Director;
      const action = CompanyDirectorActions.getCompanyDirectors({
        companyNumber,
      });
      const successAction = CompanyDirectorActions.getCompanyDirectorsSuccess({
        companyNumber,
        directors,
      });

      actions$ = of(action);
      vi.spyOn(directorSearchService, 'searchDirectors').mockReturnValue(
        of(directors),
      );

      const effect = TestBed.runInInjectionContext(() =>
        viewCompanyDirectors(),
      );

      effect.subscribe((result) => {
        expect(result).toEqual(successAction);
      });
    });

    test('should dispatch getCompanyDirectorsFailure on error', () => {
      const companyNumber = '12345';
      const error: ViewCompanyError = {
        message: 'We could not find any directors for this company.',
        companyNumber,
        name: '',
      };
      const action = CompanyDirectorActions.getCompanyDirectors({
        companyNumber,
      });
      const failureAction = CompanyDirectorActions.getCompanyDirectorsFailure({
        error: error.message,
        companyNumber,
      });

      actions$ = of(action);
      vi.spyOn(directorSearchService, 'searchDirectors').mockReturnValue(
        throwError(() => error),
      );

      const effect = TestBed.runInInjectionContext(() =>
        viewCompanyDirectors(),
      );

      effect.subscribe((result) => {
        expect(result).toEqual(failureAction);
      });
    });
  });

  describe('viewCompanyDetailsFailure', () => {
    test('should dispatch setNotification on failure', () => {
      const error = 'Error message';
      const companyNumber = '12345';
      const action = CompanyDirectorActions.getCompanyDirectorsFailure({
        error,
        companyNumber,
      });
      const notificationAction = setNotification({
        message: error,
        error: true,
        delay: 5000,
      });

      actions$ = of(action);

      const effect = TestBed.runInInjectionContext(() =>
        viewCompanyDetailsFailure(),
      );

      effect.subscribe((result) => {
        expect(result).toEqual(notificationAction);
      });
    });
  });
});
