import { createSelector } from '@reduxjs/toolkit';

const selectAuthState = (state: any) => {
  return state.auth;
};

export const authStatusSelector = createSelector(
  [selectAuthState],
  (state) => state.status,
);

export const isLoginSuccess = createSelector(
  [selectAuthState],
  (state) => state.status === 'success',
);

export const userInformation = createSelector(
  [selectAuthState],
  (state) => state.user,
);

export const authMessage = createSelector(
  [selectAuthState],
  (state) => state.message,
);

export const isChangeSuccess = createSelector(
  [selectAuthState],
  (state) => state.changePasswordStatus,
);
