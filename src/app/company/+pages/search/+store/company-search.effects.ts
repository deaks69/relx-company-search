import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CompanySearchActions from './company-search.actions';
import { CompanySearchService } from '../../../services/company-search.service';
import { Router } from '@angular/router';

export const search = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    companySearchService = inject(CompanySearchService),
  ) => {
    return actions$.pipe(
      ofType(CompanySearchActions.search),
      exhaustMap(({ search }) =>
        companySearchService.searchCompanies(search).pipe(
          map((companies) => CompanySearchActions.searchSuccess({ companies })),
          tap(() => router.navigateByUrl(`/companies/search?q=${search}`)),
          catchError((error: { message: string }) =>
            of(CompanySearchActions.searchFailure({ error: error.message })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
