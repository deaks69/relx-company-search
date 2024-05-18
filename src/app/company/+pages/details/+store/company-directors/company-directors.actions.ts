import { createAction, props } from '@ngrx/store';
import { Director } from '../../../../models/director';

export const getCompanyDirectors = createAction(
  '[Company Directors] Get Company Directors',
  props<{ companyNumber: string }>(),
);

export const getCompanyDirectorsSuccess = createAction(
  '[Company Directors] Get Company Directors Success',
  props<{ companyNumber: string; directors: Director }>(),
);

export const getCompanyDirectorsFailure = createAction(
  '[Company Directors] Get Company Directors Failure',
  props<{ error: string; companyNumber: string }>(),
);

export const clearCompanyDirectors = createAction(
  '[Company Directors] Clear Company Directors',
);
