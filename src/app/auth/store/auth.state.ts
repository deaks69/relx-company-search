export interface AuthState {
  user: any;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};
