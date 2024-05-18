import { createAction, props } from '@ngrx/store';
import { CompanySearchItem } from '../../../../models/company-search';

export const viewCompanyDetails = createAction(
  '[Company Details] View Company Details',
  props<{ companyNumber: string }>(),
);

export const viewCompanyDetailsSuccess = createAction(
  '[Company Details] View Company Details Success',
  props<{ company: CompanySearchItem }>(),
);

export const viewCompanyDetailsFailure = createAction(
  '[Company Details] View Company Details Failure',
  props<{ companyNumber: string; error: string }>(),
);

export const clearCompanyDetails = createAction(
  '[Company Details] Clear Company Details',
);
