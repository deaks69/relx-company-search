import { CompanySearch } from '../../../models/company-search';

export interface CompanySearchState {
  search: string | null;
  selectedPage: number;
  itemsPerPage: number;
  latest: CompanySearch | null;
  error: string | null;
  loading: boolean;
}

export const initialState: CompanySearchState = {
  search: null,
  selectedPage: 1,
  itemsPerPage: 5,
  latest: null,
  error: null,
  loading: false,
};
