import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CompanyDetailsActions from './company-details.actions';
import { Router } from '@angular/router';
import { ViewCompanyDetailsService } from '../../../../services/view-company-details.service';
import { ViewCompanyError } from '../../../../../auth/models/view-company-error';
import { setNotification } from '../../../../../store/notifications.actions';

export const viewCompanyDetails = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    viewCompanyDetailsService = inject(ViewCompanyDetailsService),
  ) => {
    return actions$.pipe(
      ofType(CompanyDetailsActions.viewCompanyDetails),
      exhaustMap(({ companyNumber }) =>
        viewCompanyDetailsService.viewCompanyDetails(companyNumber).pipe(
          map((company) =>
            CompanyDetailsActions.viewCompanyDetailsSuccess({ company }),
          ),
          tap(() => router.navigateByUrl(`/companies/${companyNumber}`)),
        ),
      ),
      catchError((error: ViewCompanyError) =>
        of(
          CompanyDetailsActions.viewCompanyDetailsFailure({
            error: error.message,
            companyNumber: error.companyNumber,
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const viewCompanyDetailsFailure = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(CompanyDetailsActions.viewCompanyDetailsFailure),
      tap(({ error, companyNumber }) =>
        router.navigateByUrl(`/login?returnUrl=/companies/${companyNumber}`),
      ),
      map(({ error }) =>
        setNotification({ message: error, error: true, delay: 5000 }),
      ),
    );
  },
  { functional: true },
);
