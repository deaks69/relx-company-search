import { createAction, props } from '@ngrx/store';
import { CompanySearch } from '../../../models/company-search';

export const search = createAction(
  '[Company Search Page] Search',
  props<{ search: string }>(),
);

export const searchSuccess = createAction(
  '[Company Search API] Search Success',
  props<{ companies: CompanySearch }>(),
);

export const searchFailure = createAction(
  '[Company Search API] Search Failure',
  props<{ error: string }>(),
);

export const setSelectedPage = createAction(
  '[Company Search Page] Set Selected Page',
  props<{ page: number; itemsPerPage: number }>(),
);

export const setItemsPerPage = createAction(
  '[Company Search Page] Set Items Per Page',
  props<{ itemsPerPage: number }>(),
);
