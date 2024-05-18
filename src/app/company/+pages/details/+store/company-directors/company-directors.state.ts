import { Director } from '../../../../models/director';

export interface CompanyDirectorsState {
  latest: Director | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CompanyDirectorsState = {
  latest: null,
  loading: false,
  error: null,
};
