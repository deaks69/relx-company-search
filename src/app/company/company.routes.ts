import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { companyDetailsReducer } from './+pages/details/+store/company-details/company-details.reducers';
import { isLoggedInGuard } from '../auth/guards/is-logged-in.guard';
import { provideEffects } from '@ngrx/effects';
import * as CompanyDetailsEffects from './+pages/details/+store/company-details/company-details.effects';
import * as CompanyDirectorsEffects from './+pages/details/+store/company-directors/company-directors.effects';
import { companyDirectorsReducer } from './+pages/details/+store/company-directors/company-directors.reducers';

export const COMPANY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./+pages/search/company-search-page.component').then(
        (m) => m.CompanySearchPageComponent,
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import(
        './+pages/search/components/company-search-results/company-search-results.component'
      ).then((m) => m.CompanySearchResultsComponent),
  },
  {
    path: ':id',
    providers: [
      provideState({ name: 'companyDetails', reducer: companyDetailsReducer }),
      provideState({
        name: 'companyDirectors',
        reducer: companyDirectorsReducer,
      }),
      provideEffects([CompanyDetailsEffects, CompanyDirectorsEffects]),
    ],
    canActivate: [isLoggedInGuard()],
    loadComponent: () =>
      import('./+pages/details/company-details-page.component').then(
        (m) => m.CompanyDetailsPageComponent,
      ),
  },
];
