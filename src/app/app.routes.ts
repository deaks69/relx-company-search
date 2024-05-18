import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { companySearchReducer } from './company/+pages/search/+store/company-search.reducers';
import { provideEffects } from '@ngrx/effects';
import * as CompanySearchEffects from './company/+pages/search/+store/company-search.effects';
import { companyDetailsReducer } from './company/+pages/details/+store/company-details/company-details.reducers';
import { companyDirectorsReducer } from './company/+pages/details/+store/company-directors/company-directors.reducers';
import * as CompanyDirectorsEffects from './company/+pages/details/+store/company-directors/company-directors.effects';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'companies',
    pathMatch: 'full',
  },
  {
    path: 'companies',
    providers: [
      provideState({ name: 'companySearch', reducer: companySearchReducer }),
      provideState({ name: 'companyDetails', reducer: companyDetailsReducer }),
      provideState({
        name: 'companyDirectors',
        reducer: companyDirectorsReducer,
      }),
      provideEffects([CompanySearchEffects, CompanyDirectorsEffects]),
    ],
    loadChildren: () =>
      import('./company/company.routes').then((m) => m.COMPANY_ROUTES),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'companies',
  },
];
