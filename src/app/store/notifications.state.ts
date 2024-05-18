export interface NotificationsState {
  message: string | null;
  error: boolean;
  delay?: number | null;
}

export const initialState: NotificationsState = {
  message: null,
  error: false,
  delay: null,
};
