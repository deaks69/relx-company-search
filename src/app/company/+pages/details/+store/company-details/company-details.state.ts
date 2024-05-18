import { CompanySearchItem } from '../../../../models/company-search';

export interface CompanyDetailsState {
  latest: CompanySearchItem | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CompanyDetailsState = {
  latest: null,
  loading: false,
  error: null,
};
