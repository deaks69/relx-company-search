import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Router } from '@angular/router';
import { CompanySearchService } from '../../../../services/company-search.service';
import * as CompanySearchActions from '../company-search.actions';
import { search } from '../company-search.effects';
import { CompanySearch } from '../../../../models/company-search';

describe('CompanySearchEffects', () => {
  let actions$: Observable<any>;
  let companySearchService: CompanySearchService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: CompanySearchService,
          useValue: {
            searchCompanies: vi.fn(),
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

    companySearchService = TestBed.inject(CompanySearchService);
    router = TestBed.inject(Router);
  });

  describe('search', () => {
    test('should dispatch searchSuccess and navigate on success', () => {
      const searchQuery = 'test';
      const companies = { name: 'Test Company' } as unknown as CompanySearch;
      const action = CompanySearchActions.search({ search: searchQuery });
      const successAction = CompanySearchActions.searchSuccess({ companies });

      actions$ = of(action);
      vi.spyOn(companySearchService, 'searchCompanies').mockReturnValue(
        of(companies),
      );
      vi.spyOn(router, 'navigateByUrl');

      const effect = TestBed.runInInjectionContext(() => search());

      effect.subscribe((result) => {
        expect(result).toEqual(successAction);
        expect(router.navigateByUrl).toHaveBeenCalledWith(
          `/companies/search?q=${searchQuery}`,
        );
      });
    });

    test('should dispatch searchFailure on error', () => {
      const searchQuery = 'test';
      const error = { message: 'Error occurred' };
      const action = CompanySearchActions.search({ search: searchQuery });
      const failureAction = CompanySearchActions.searchFailure({
        error: error.message,
      });

      actions$ = of(action);
      vi.spyOn(companySearchService, 'searchCompanies').mockReturnValue(
        throwError(() => error),
      );

      const effect = TestBed.runInInjectionContext(() => search());

      effect.subscribe((result) => {
        expect(result).toEqual(failureAction);
      });
    });
  });
});
