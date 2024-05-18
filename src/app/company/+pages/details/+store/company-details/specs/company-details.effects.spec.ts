import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ViewCompanyDetailsService } from '../../../../../services/view-company-details.service';
import { Router } from '@angular/router';
import * as CompanyDetailsActions from '../company-details.actions';
import {
  viewCompanyDetails,
  viewCompanyDetailsFailure,
} from '../company-details.effects';
import { ViewCompanyError } from '../../../../../../auth/models/view-company-error';
import { CompanySearchItem } from '../../../../../models/company-search';
import { setNotification } from '../../../../../../store/notifications.actions';

describe('CompanyDetailsEffects', () => {
  let actions$: Observable<any>;
  let viewCompanyDetailsService: ViewCompanyDetailsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: ViewCompanyDetailsService,
          useValue: {
            viewCompanyDetails: vi.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: vi.fn(),
          },
        },
      ],
    });

    viewCompanyDetailsService = TestBed.inject(ViewCompanyDetailsService);
    router = TestBed.inject(Router);
  });

  describe('viewCompanyDetails', () => {
    test('should dispatch viewCompanyDetailsSuccess and navigate on success', () => {
      const companyNumber = '12345';
      const company = { name: 'Test Company' } as unknown as CompanySearchItem;
      const action = CompanyDetailsActions.viewCompanyDetails({
        companyNumber,
      });
      const successAction = CompanyDetailsActions.viewCompanyDetailsSuccess({
        company,
      });

      actions$ = of(action);
      vi.spyOn(viewCompanyDetailsService, 'viewCompanyDetails').mockReturnValue(
        of(company),
      );

      const effect = TestBed.runInInjectionContext(() => viewCompanyDetails());

      effect.subscribe((result) => {
        expect(result).toEqual(successAction);
        expect(router.navigateByUrl).toHaveBeenCalledWith(
          `/companies/${companyNumber}`,
        );
      });
    });

    test('should dispatch viewCompanyDetailsFailure on error', () => {
      const companyNumber = '12345';
      const error: ViewCompanyError = {
        message: 'Error',
        companyNumber,
        name: 'View Company Error',
      };
      const action = CompanyDetailsActions.viewCompanyDetails({
        companyNumber,
      });
      const failureAction = CompanyDetailsActions.viewCompanyDetailsFailure({
        error: error.message,
        companyNumber,
      });

      actions$ = of(action);
      vi.spyOn(viewCompanyDetailsService, 'viewCompanyDetails').mockReturnValue(
        throwError(() => error),
      );

      const effect = TestBed.runInInjectionContext(() => viewCompanyDetails());

      effect.subscribe((result) => {
        expect(result).toEqual(failureAction);
      });
    });
  });

  describe('viewCompanyDetailsFailure', () => {
    test('should navigate to login and dispatch setNotification on failure', () => {
      const error = 'Error';
      const companyNumber = '12345';
      const action = CompanyDetailsActions.viewCompanyDetailsFailure({
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
        expect(router.navigateByUrl).toHaveBeenCalledWith(
          `/login?returnUrl=/companies/${companyNumber}`,
        );
        expect(result).toEqual(notificationAction);
      });
    });
  });
});
