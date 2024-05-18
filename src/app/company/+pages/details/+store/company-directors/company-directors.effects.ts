import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DirectorSearchService } from '../../../../services/director-search.service';
import * as CompanyDirectorActions from './company-directors.actions';
import { ViewCompanyError } from '../../../../../auth/models/view-company-error';
import { setNotification } from '../../../../../store/notifications.actions';

export const viewCompanyDirectors = createEffect(
  (
    actions$ = inject(Actions),
    directorSearchService = inject(DirectorSearchService),
  ) => {
    return actions$.pipe(
      ofType(CompanyDirectorActions.getCompanyDirectors),
      exhaustMap(({ companyNumber }) =>
        directorSearchService.searchDirectors(companyNumber).pipe(
          map((directors) =>
            CompanyDirectorActions.getCompanyDirectorsSuccess({
              companyNumber,
              directors,
            }),
          ),
          catchError((error: ViewCompanyError) =>
            of(
              CompanyDirectorActions.getCompanyDirectorsFailure({
                error: 'We could not find any directors for this company.',
                companyNumber: error.companyNumber,
              }),
            ),
          ),
        ),
      ),
      catchError((error: ViewCompanyError) =>
        of(
          CompanyDirectorActions.getCompanyDirectorsFailure({
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
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(CompanyDirectorActions.getCompanyDirectorsFailure),
      map(({ error }) =>
        setNotification({ message: error, error: true, delay: 5000 }),
      ),
    );
  },
  { functional: true },
);
